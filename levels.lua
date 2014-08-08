local drystal = require 'drystal'
local Turret = require 'turret'

local Level = {
	hue=0,
	buffer=nil,
}
Level.__index = Level

function Level:init()
	for i, b in pairs(self.boxes) do
		local shape = drystal.new_shape('box', b.w, b.h)
		shape:set_friction(0)
		shape:set_restitution(0.35)
		b.body = drystal.new_body(false, shape)
		b.body:set_position(b.x, b.y)
		b.body.is_wall = true
	end
	do
		local ar = self.arrival
		local shape = drystal.new_shape('circle', ar.w / 2)
		shape:set_sensor(true)
		ar.body = drystal.new_body(false, shape)
		ar.body:set_position(ar.x+ar.w/4, ar.y+ar.w/4)
	end
	for _, c in pairs(self.capsules) do
		local shape = drystal.new_shape('circle', c.size)
		shape:set_sensor(true)
		c.body = drystal.new_body(false, shape)
		c.body:set_position(c.x+c.size/2, c.y+c.size/2)
		c.body.is_capsule = true
		c.body.parent = c
		c.is_visible = true
	end
	for _, t in pairs(self.texts) do
		local shape = drystal.new_shape('box', t.w, t.h)
		shape:set_sensor(true)
		t.body = drystal.new_body(false, shape)
		t.body:set_position(t.x, t.y)
		t.body.is_text = true
		t.body.parent = t
		t.string = self.textdata[t.text]
	end
	for _, t in pairs(self.turrets) do
		local shape = drystal.new_shape('box', t.size, t.size)
		t.body = drystal.new_body(false, t.x, t.y, shape)
		t.body.is_turret = true
		t.body.parent = t
		t.angle = 0
		t.level = self
	end
end

function Level:destroy()
	for i, b in pairs(self.boxes) do
		b.body:destroy()
	end
	self.arrival.body:destroy()
	for _, c in pairs(self.capsules) do
		c.body:destroy()
	end
	for _, t in pairs(self.texts) do
		t.body:destroy()
	end
	for _, t in pairs(self.turrets) do
		t:destroy()
	end
end

function Level:draw()
	local ct = require 'content'
	if not self.buffer then
		local oldcamerax, oldcameray = drystal.camera.x, drystal.camera.y
		drystal.camera.x, drystal.camera.y = 0, 0

		self.buffer = drystal.new_buffer()
		self.buffer:use()

		local R = self.ratio

		drystal.set_alpha(255)
		local start = self.start
		local function sign() return math.random(1, 2) == 1 and 1 or -1 end
		for i = 1, 40 do
			local x = math.random(start.x-20, start.x+20)
			local y = math.random(start.y-20, start.y+20)
			local s = math.random(85, 95) / 100
			local l = math.random(85, 95) / 100
			local c = drystal.new_color('hsl', (self.hue+math.random(-5, 5))%360, s, l)
			drystal.set_color(c)
			local x2, y2 = x+math.random(50, 100)*sign(), y+math.random(90, 170)*sign()
			local x3, y3 = x+math.random(90, 170)*sign(), y+math.random(50, 100)*sign()
			drystal.draw_triangle(x*R, y*R, x2*R, y2*R, x3*R, y3*R)
		end

		for i, b in pairs(self.boxes) do
			local w, h = b.w*R, b.h*R
			local x = b.x * R
			local y = b.y * R
			local outline = 4

			drystal.set_color(b.outoutcolor)
			drystal.draw_rect(x, y, w, h)

			drystal.set_color(b.outcolor)
			drystal.draw_rect(x+outline, y+outline, w-outline*2, h-outline*2)

			outline = outline * 2
			drystal.set_color(b.color)
			drystal.draw_rect(x+outline, y+outline, w-outline*2, h-outline*2)
		end

		drystal.use_default_buffer()
		self.buffer:upload_and_free()
		drystal.camera.x, drystal.camera.y = oldcamerax, oldcameray
	end

	local R = self.ratio
	self.buffer:draw()

	local st = self.start
	local sprite = ct.sprites.start
	drystal.set_color(st.color)
	drystal.draw_sprite_resized(sprite, st.x*R-R, st.y*R-R, st.w*R, st.h*R)

	local st = self.arrival
	local sprite = ct.sprites.arrival
	drystal.set_color(st.color)
	drystal.draw_sprite_resized(sprite, st.x*R-R, st.y*R-R, st.w*R, st.h*R)

	for _, c in ipairs(self.capsules) do
		if c.is_visible then
			local sprite
			if c.type == 'fuel' then
				sprite = ct.sprites.fuel_capsule
				drystal.set_color(255,255,255)
			else
				sprite = ct.sprites.health_capsule
				drystal.set_color(255, 0, 0)
			end
			drystal.draw_sprite(sprite, c.x*R, c.y*R)
		end
	end
	for _, t in ipairs(self.turrets) do
		t:draw()
	end
	drystal.set_alpha(255)
	for _, t in ipairs(self.turrets) do
		t:draw2()
	end
end

local function load_level(name, hue, angle)
	local level = require('levels/' .. name)

	local function gencolors()
		local h = (hue+math.random(-5,5)) % 360
		local s = math.random(50, 70)/100
		local l = math.random(30, 50)/100
		return drystal.new_color('hsl', h, s, l),
			drystal.new_color('hsl', h, s, math.max(0, l - .2)),
			drystal.new_color('hsl', h, s, math.max(0, l - .4))
	end

	level.hue = hue

	level.start.w = 3
	level.start.h = 3
	level.start.color = {0, 255, 0}

	level.arrival.w = 3
	level.arrival.h = 3
	level.arrival.color = {100, 100, 255}

	local color = drystal.new_color('hsl', hue, 0.5, 0.8)
	level.background = color

	for _, b in pairs(level.boxes) do
		b.color, b.outcolor, b.outoutcolor = gencolors()
	end
	for _, c in pairs(level.capsules) do
		c.size = 0.5
		c.visible = true
	end
	for i, t in pairs(level.turrets) do
		level.turrets[i] = setmetatable(t, Turret)
		level.turrets[i]:on_attach()
	end
	for _, t in pairs(level.turrets) do
		t.size = 2
		t.color, t.color2 = gencolors()
	end

	level.ratio = 16
	level.angle = angle
	return setmetatable(level, Level)
end

local levels = {
	load_level('level1', 130, -math.pi*.7),
	load_level('level2', 273, -math.pi*.2), -- cave
	load_level('level3', 220, -math.pi*.5), -- go up
	load_level('level4', 30 , -math.pi*.2), -- snail
	load_level('level5', 280, -math.pi*.0), -- go down
	load_level('level6', 0  , -math.pi*.2), -- first turret
	load_level('level7', 180, -math.pi*.7), -- long
	load_level('level8', 20 , -math.pi*.15), -- run
	load_level('level9', 273 , -math.pi*.2), -- reverse cave
	load_level('level10', 50 , math.pi*.2), -- last one
}

return levels
