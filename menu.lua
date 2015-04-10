local drystal = require 'drystal'
local timer = require 'hump/timer'
local ct = require 'content'
local gamestate = require 'game'.init()

local menustate = {
}

local dostuff = true
function menustate:on_enter()
	self.r = 0
	self.g = 0
	self.b = 0
	self.text_alpha = 0
	dostuff = true

	function all()
		if dostuff then
			timer.tween(5, self, {r=200, g=200, b=200}, 'bounce', green)
			timer.tween(12, self, {text_alpha=255}, 'quad')
		end
	end
	function all_off()
		if dostuff then
			timer.tween(5, self, {r=200, g=200, b=200}, 'expo', all)
			timer.tween(4, self, {text_alpha=0}, 'quad')
		end
	end
	function green()
		timer.tween(4, self, {r=0, b=100, g=100}, 'quad', red)
	end
	function blue()
		timer.tween(4, self, {r=100, b=100, g=0}, 'quad', all_off)
	end
	function red()
		timer.tween(4, self, {r=100, b=0, g=100}, 'quad', blue)
	end
	all()
end

function menustate:update(dt)
end

function menustate:draw()
	drystal.set_color(self.r, self.g, self.b)
	drystal.set_alpha(255)
	drystal.draw_background()

	drystal.set_alpha(math.min(255, self.r+self.g+self.b))
	drystal.set_color(255, 255, 255)
	local transform = {
		angle=0,
		wfactor=0.7,
		hfactor=0.7,
	}
	local sprite = ct.sprites.title
	local w = sprite.w * transform.wfactor
	local h = sprite.h * transform.hfactor
	drystal.draw_sprite(sprite, (width - w) / 2, (height - h) / 2, transform)

	drystal.set_color(255,255,255)
	drystal.set_alpha(self.text_alpha)
	local text = 'Press enter to play'
	if gamestate.hard then
		text = 'Hard mode enabled. Theme: 5 seconds'
	end
	ct.fonts.big:draw(text, width / 2, height*.8, 2)
end

local harding = false
function menustate:key_press(key)
	if key == 'return' or key == 'space' then
		dostuff = false
		local level = 1
		local datas = drystal.fetch('chronored')
		if datas then
			level = datas.level
			gamestate.hard = datas.hard
		end
		gamestate:change_level(level)
		set_state(gamestate)
	end
	if key == 'h' then
		harding = true
		timer.add(0.5, function()
			if harding then
				gamestate.hard = not gamestate.hard
				harding = false
			end
		end)
	end
end
function menustate:key_release(key)
	if key == 'h' then
		harding = false
	end
end

function menustate:mouse_press(x, y, b)
end
function menustate:mouse_release(x, y, b)
end
function menustate:mouse_motion(x, y, dx, dy)
end

return menustate

