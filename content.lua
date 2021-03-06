local drystal = require 'drystal'

local ct = {
	sounds = {
	},
	fonts = {
	},
	images = {
	},
	sprites = {
		title = {x=0, y=64, w=852, h=303},
		ship = {x=1, y=3, w=64-1, h=64-3},
		ship_engine = {x=1+64, y=3, w=64-1, h=64-3},
		fuel_capsule = {x=128+16, y=0, w=16, h=16},
		health_capsule = {x=128+32, y=0, w=16, h=16},
		start = {x=192, y=0, w=32, h=32},
		arrival = {x=368, y=0, w=64, h=64},
		turret_base = {x=256, y=0, w=32, h=32},
		turret_canon = {x=288, y=0, w=32, h=32},
		missile = {x=320, y=0, w=32, h=32},
	},
	levels = require 'levels',
}

function ct.play(str)
	local table = ct.sounds[str]
	table[math.random(1, #table)]:play()
end

function ct.load()
	ct.max_level = #ct.levels

	ct.images.spritesheet = drystal.load_surface('spritesheet.png')
	ct.images.spritesheet:set_filter(drystal.filters.trilinear)
	ct.images.spritesheet:draw_from()

	ct.fonts.small = drystal.load_font('styllo.ttf', 20)
	ct.fonts.normal = drystal.load_font('styllo.ttf', 32)
	ct.fonts.big = drystal.load_font('styllo.ttf', 48)

	--ct.sounds.consume_fuel = load_sound('consume_fuel.wav')
	ct.sounds.collide = {
		drystal.load_sound('sounds/collide1.wav'),
		drystal.load_sound('sounds/collide2.wav'),
		drystal.load_sound('sounds/collide3.wav'),
		drystal.load_sound('sounds/collide4.wav'),
	}
	ct.sounds.fire = {
		drystal.load_sound('sounds/fire1.wav'),
	}
	ct.sounds.littlehurt = {
		drystal.load_sound('sounds/littlehurt1.wav'),
	}
	ct.sounds.out = {
		drystal.load_sound('sounds/out1.wav'),
	}
	ct.sounds.explode = {
		drystal.load_sound('sounds/explode1.wav'),
		drystal.load_sound('sounds/explode2.wav'),
	}
	ct.sounds.next_level = {
		drystal.load_sound('sounds/next_level.wav'),
	}
	ct.sounds.ending = {
		drystal.load_sound('sounds/ending.wav'),
	}
	ct.sounds.regen_health = {
		drystal.load_sound('sounds/regen_health.wav'),
	}
	ct.sounds.regen_fuel = {
		drystal.load_sound('sounds/regen_fuel.wav'),
	}
end

return ct
