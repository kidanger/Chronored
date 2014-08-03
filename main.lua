local drystal = require 'drystal'

local timer = require 'hump/timer'

local ct = require 'content'

width, height = 800, 600

local state = {}

local menustate = require 'menu'

--[[===================
----======= INIT ======]]
function drystal.init()
	if drystal.is_web then
		drystal.set_fullscreen(true)
		width = drystal.screen.w
		height = drystal.screen.h
	else
		drystal.resize(width, height)
	end
	ct.load()
	set_state(menustate)
end


--[[=====================
----======= UPDATE ======]]
local time = 0
function drystal.update(dt)
	if dt > .6 then dt =.6 end
	time = time + dt
	state:update(dt)
	timer.update(dt)
end

function set_state(_state)
	state = _state
	if state.on_enter then
		state:on_enter()
	end
end


--[[===================
----======= DRAW ======]]
function drystal.draw()
	state:draw()
end


--[[=====================
----======= EVENTS ======]]

local mute = false
function drystal.key_press(key)
	if key == 'a' then
		--engine_stop()
	elseif key == 'm' then
		mute = not mute
		if mute then
			drystal.set_sound_volume(0)
		else
			drystal.set_sound_volume(1)
		end
	elseif state.key_press then
		state:key_press(key)
	end
end
function drystal.key_release(key)
	if state.key_release then
		state:key_release(key)
	end
end

function drystal.mouse_motion(x, y, dx, dy)
	if state.mouse_motion then
		state:mouse_motion(x, y, dx, dy)
	end
end
function drystal.mouse_press(x, y, b)
	if state.mouse_press then
		state:mouse_press(x, y, b)
	end
end
function drystal.mouse_release(x, y, b)
	if state.mouse_release then
		state:mouse_release(x, y, b)
	end
end

function drystal.resize_event(w, h)
	if drystal.is_web then
		drystal.set_fullscreen(true)
	end
	width = w
	height = h
	print('resized!')
end
