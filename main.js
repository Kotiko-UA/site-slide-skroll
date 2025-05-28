const mainSwiper = new Swiper('.main-swiper', {
	direction: 'vertical',
	slidesPerView: 1,
	spaceBetween: 0,
	mousewheel: {
		forceToAxis: true,
	},
	pagination: {
		el: '.main-pagination',
		clickable: true,
		type: 'progressbar',
	},
	speed: 1000,
})

const nestedSwiper = new Swiper('.nested-swiper', {
	direction: 'horizontal',
	slidesPerView: 1,
	spaceBetween: 0,
	pagination: {
		el: '.nested-pagination',
		clickable: true,
		type: 'progressbar',
	},
	allowTouchMove: true,
	speed: 1700,
})

mainSwiper.on('slideChange', () => {
	if (mainSwiper.activeIndex === 2) {
		// індекс горизонтального свайпера.
		mainSwiper.mousewheel.disable()
	} else {
		mainSwiper.mousewheel.enable()
	}
})

let scrollLocked = false

document.querySelector('.nested-swiper').addEventListener(
	'wheel',
	e => {
		if (mainSwiper.activeIndex !== 2) return // зараз горизонтальний скрол тільки на слайді 3, якщо треба інший - зміни.
		e.preventDefault()

		if (scrollLocked) return
		scrollLocked = true

		setTimeout(() => {
			scrollLocked = false
		}, 500) // час затримки в мс перед гортанням далі, бо криво гортає.

		if (e.deltaY > 0) {
			if (nestedSwiper.isEnd) {
				mainSwiper.slideNext()
			} else {
				nestedSwiper.slideNext()
			}
		} else {
			if (nestedSwiper.isBeginning) {
				mainSwiper.slidePrev()
			} else {
				nestedSwiper.slidePrev()
			}
		}
	},
	{ passive: false }
)
