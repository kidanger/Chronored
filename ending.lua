local drystal = require 'drystal'
local timer = require 'hump/timer'
local ct = require 'content'
local gamestate = require 'game'
local menustate = require 'menu'

local endingstate = {
}

function endingstate:on_enter()
	self.thanksx=-width*0.5
	self.thanksy=-30
	self.madebyx=width*1.5
	self.madebyy=-30

	self.alphasecs=0
	self.seconds=10
	self.prefix='Theme: '
	self.alpha = 0
	self.fading = true

	timer.tween(2, self, {alpha=255}, 'quad', function()
		self.fading = false
		timer.tween(1.7, self, {thanksx=width/2, thanksy=height/2-50}, 'out-elastic', function()
			timer.tween(1.5, self, {alphasecs=100,madebyx=width/2, madebyy=height/2+100}, 'out-elastic', function()
				self.prefix = ''
				timer.tween(10, self, {alphasecs=255, seconds=0}, 'linear', function()
					self.seconds = 0
					timer.add(0.1, function() -- because the 0 won't be displayed otherwise
						gamestate.hard = true
						gamestate:change_level(1)
						self.alpha = 255
						self.fading = true
						timer.tween(2, self, {alpha=0}, 'quad', function()
							set_state(gamestate)
						end)
					end)
				end)
			end)
		end)
	end)
end

function endingstate:update(dt)
	if self.fading then
		return
	end
end

local function coolround(num)
	local n = math.floor(num)
	local dec = math.floor((num - n) * 10)
	return math.floor(n) .. '.' .. dec
end
function endingstate:draw()
	if self.fading then
		gamestate:draw()
		drystal.set_color(0, 0, 0)
		drystal.set_alpha(self.alpha)
		drystal.draw_rect(0, 0, width, height)
		return
	end

	drystal.set_color(0, 0, 0)
	drystal.set_alpha(255)
	drystal.draw_background()

	drystal.set_color(255, 255, 255)
	ct.fonts.big:draw('Thanks for playing', self.thanksx, self.thanksy, 2)

	ct.fonts.normal:draw('Made by kidanger, for LudumDare #27', self.madebyx, self.madebyy, 2)

	drystal.set_alpha(self.alphasecs)
	ct.fonts.normal:draw(self.prefix .. coolround(self.seconds) .. ' seconds', self.madebyx, self.madebyy + 50, 2)

	if self.seconds < 5 then
		drystal.set_alpha(self.alphasecs)
		ct.fonts.normal:draw('Hardmode enabled. Theme: 5 seconds.', self.madebyx, self.madebyy + 100, 2)
	end
end

function endingstate:key_press(key)
end
function endingstate:key_release(key)
end

function endingstate:mouse_press(x, y, b)
end
function endingstate:mouse_release(x, y, b)
end
function endingstate:mouse_motion(x, y, dx, dy)
end

return endingstate
