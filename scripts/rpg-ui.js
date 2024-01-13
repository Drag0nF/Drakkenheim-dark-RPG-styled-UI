Hooks.on('init', () => {
	// Register module settings.
	game.settings.register('drakkenheim-rpg-styled-ui', 'navigationVerticalToggle', {
		name: game.i18n.localize('DRAKRPGUI.SETTINGS.NAVIGATION'),
		hint: game.i18n.localize('DRAKRPGUI.SETTINGS.NAVIGATION_HINT'),
		scope: "world",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});
	game.settings.register('drakkenheim-rpg-styled-uii', 'compactModeToggle', {
		name: game.i18n.localize('DRAKRPGUI.SETTINGS.COMPACT_MODE'),
		hint: game.i18n.localize('DRAKRPGUI.SETTINGS.COMPACT_MODE_HINT'),
		scope: "world",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});
	game.settings.register('drakkenheim-rpg-styled-ui', 'standardLogoToggle', {
		name: game.i18n.localize('DRAKRPGUI.SETTINGS.STANDARD_LOGO'),
		hint: game.i18n.localize('DRAKRPGUI.SETTINGS.STANDARD_LOGO_HINT'),
		scope: "world",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});
	game.settings.register('drakkenheim-rpg-styled-ui', 'minimalUICompatibility', {
		name: game.i18n.localize('DRAKRPGUI.SETTINGS.MINIMAL_UI'),
		hint: game.i18n.localize('DRAKRPGUI.SETTINGS.MINIMAL_UI_HINT'),
		scope: "world",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});
	game.settings.register('drakkenheim-rpg-styled-ui', 'disableAllStyles', {
		name: game.i18n.localize('DRAKRPGUI.SETTINGS.DISABLE_STYLES'),
		hint: game.i18n.localize('DRAKRPGUI.SETTINGS.DISABLE_STYLES_HINT'),
		scope: "client",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

	if (!game.settings.get('drakkenheim-rpg-styled-ui', 'compactModeToggle')) {
		if (!game.settings.get('drakkenheim-rpg-styled-ui', 'standardLogoToggle')) {
			addClassByQuerySelector("hide", "img#logo")

			let newLogo = document.createElement('div');
			let uiLeft = document.getElementById('ui-left')
			newLogo.classList.add("new-logo")
			newLogo.innerText = "Foundry \nVTT"
			uiLeft.prepend(newLogo)
		}
	}

	if (!game.settings.get('drakkenheim-rpg-styled-ui', 'disableAllStyles')) {
		DRAKRPGUIAddMainCss()
		addCompatibilityCss()
	}

	if (game.settings.get('drakkenheim-rpg-styled-ui', 'minimalUICompatibility')) {
		addClassByQuerySelector('minimal-ui-mode', 'body.vtt')
	}
});

// Retreat class of Monk's Little Details
Hooks.on('ready', async () => {
	$("body").removeClass("change-windows");
});


Hooks.on('renderCombatCarousel', () => {
	let carouselSize = game.settings.get('combat-carousel', 'carouselSize')
	if (carouselSize !== "") {
		addClassByQuerySelector(carouselSize, "#combat-carousel")
	}
});

function addClassByQuerySelector(className, selector) {
	let navigation = document.querySelector(selector);
	navigation.classList.add(className)
}

function DRAKRPGUIAddMainCss() {
	const head = document.getElementsByTagName("head")[0];
	const mainCss = document.createElement("link");
	mainCss.setAttribute("rel", "stylesheet")
	mainCss.setAttribute("type", "text/css")
	mainCss.setAttribute("href", "modules/drakkenheim-rpg-styled-ui/css/rpg-ui.css")
	mainCss.setAttribute("media", "all")
	head.insertBefore(mainCss, head.lastChild);
}

function addCompatibilityCss() {
	const head = document.getElementsByTagName("head")[0];
	const mainCss = document.createElement("link");
	mainCss.setAttribute("rel", "stylesheet")
	mainCss.setAttribute("type", "text/css")
	mainCss.setAttribute("href", "modules/drakkenheim-rpg-styled-ui/css/compatibility.css")
	mainCss.setAttribute("media", "all")
	head.insertBefore(mainCss, head.lastChild);
}
