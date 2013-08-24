local physic = require 'physic'
local font = require 'truetype'
local ct = require 'content'
local ship = require 'ship'

local gamestate = {
	level=0,
	ship=ship,
	scrollx=0,
	scrolly=0,
	arrived=false,

	display_text='',
	text_collides=0,
}

physic.create_world(0, 4.5)

physic.on_collision(
	function (b1, b2)
		if b1.begin_collide then b1:begin_collide(b2) end
		if b2.begin_collide then b2:begin_collide(b1) end
	end,
	function (b1, b2)
		if b1.end_collide then b1:end_collide(b2) end
		if b2.end_collide then b2:end_collide(b1) end
	end
)

function gamestate:change_level(lvlnumber)
	if self.level ~= 0 then
		local oldlvl = ct.levels[self.level]
		oldlvl:destroy()
		self.ship:destroy()
	end

	self.level = lvlnumber
	self.display_text = ''

	local lvl = ct.levels[self.level]
	lvl:init()
	self.ship:init(lvl, lvl.start.x, lvl.start.y)
	self.ship.body.begin_collide = function(_, other)
		if self.ship.dying then return end
		if other == lvl.arrival.body then
			self.arrived = true
		elseif other.is_capsule and other.parent.is_visible then
			local c = other.parent
			if c.type == 'health' then
				-- sound
				self.ship:regen_health()
			else
				-- sound
				self.ship:regen_fuel()
			end
			c.is_visible = false
		elseif other.is_wall then
			self.ship:collide()
			self.ship.collisions = self.ship.collisions + 1
		elseif other.is_text then
			self.display_text = other.parent.string
			self.text_collides = self.text_collides + 1
		end
	end
	self.ship.body.end_collide = function(ship, other)
		if self.ship.dying then return end
		if other.is_wall then
			self.ship.collisions = self.ship.collisions - 1
		elseif other.is_text then
			self.text_collides = self.text_collides - 1
			if self.text_collides == 0 then
				self.display_text = ''
			end
		end
	end
end

local function coolround(num)
	local n = math.floor(num*10)/10
	if n == 0 and num ~= 0 then n = '0.1' end
	if n == math.floor(n) then
		return n .. '.0'
	end
	return n
end
local function lines(str)
	local t = {}
	local function helper(line) table.insert(t, line) return "" end
	helper((str:gsub("(.-)\r?\n", helper)))
	return t
end
function gamestate:draw()
	local lvl = ct.levels[self.level]

	set_alpha(255)
	set_color(lvl.background)
	draw_background()

	local sx = self.scrollx - self.ship:get_screen_x() + width/2
	local sy = self.scrolly - self.ship:get_screen_y() + height/2

	push_offset(sx, sy)

	lvl:draw(-sx*2, sy*2)
	self.ship:draw()

	pop_offset()

	-- draw health
	set_alpha(200)
	set_color(0, 0, 0)
	local x, y = 10, 10
	local w = 140
	local h = 20
	draw_rect(x, y, w, h)

	set_color(120, 120, 120)
	x, y = 12, 12
	w = 136
	h = 16
	draw_rect(x, y, w, h)

	set_color(210, 0, 0)
	draw_rect(x, y, math.ceil(w*(self.ship.health / self.ship.max_health)), h)
	font.use(ct.fonts.small)
	set_color(0, 0, 0)
	font.draw_align('health: ' .. coolround(self.ship.health), x + w/2, y, 'center')
	
	-- draw fuel
	font.use(ct.fonts.big)
	--set_color(math.min(255, (1 - self.ship.fuel/self.ship.max_fuel)*255), 0, 0)
	set_color(0,0,0)
	set_alpha(math.min(255, math.max(100, (1 - self.ship.fuel/self.ship.max_fuel)*255)))
	local text = 'Fuel: ' .. coolround(self.ship.fuel) .. ' seconds'
	font.draw_align(text, width/2, 100, 'center')

	if self.display_text ~= '' then
		font.use(ct.fonts.normal)
		font.use_color(true)
		local _, h = font.sizeof(self.display_text)
		local llines = lines(self.display_text)
		set_color(255,255,255)
		draw_rect(width*.1, height - 130 + h+4, width*.8, (h+4)*#llines+h/4)
		set_color(0,0,0)
		set_alpha(200)
		for i, l in ipairs(llines) do
			font.draw_align(l, width/2, height - 130 + (h+4)*i, 'center')
		end
		font.use_color(false)
	end
end

function gamestate:update(dt)
	if self.arrived then
		if self.level < ct.max_level then
			-- sound
			self:change_level(self.level + 1)
		else
			set_state(require 'ending')
		end
		self.arrived = false
	end
	if self.ship.health == 0 and not self.ship.dying then
		self.ship:die(2)
	end
	if self.ship.die_ended then
		self:change_level(self.level)
	end
	ship:update(dt)
	physic.update(dt)
end

function gamestate:key_press(key)
	if key == 'up' then
		self.ship:gofoward()
	elseif key == 'right' then
		self.ship:rotateright()
	elseif key == 'left' then
		self.ship:rotateleft()
	end
end
function gamestate:key_release(key)
	if key == 'up' then
		self.ship:stop_gofoward()
	elseif key == 'right' then
		self.ship:stop_rotateright()
	elseif key == 'left' then
		self.ship:stop_rotateleft()
	end
	if key == 'f6' then
		self.arrived = true
	end
end

local scrolling = false
function gamestate:mouse_press(x, y, b)
	if b == 3 then
		scrolling = true
	end
end
function gamestate:mouse_release(x, y, b)
	if b == 3 then
		scrolling = false
	end
end
function gamestate:mouse_motion(x, y, dx, dy)
	if scrolling then
		self.scrollx = self.scrollx + dx*2
		self.scrolly = self.scrolly + dy*2
	end
end

return gamestate
