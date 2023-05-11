window.customCards = window.customCards || [];
window.customCards.push({
  type: "fan-mode-button-row",
  name: "fan mode button row",
  description: "A plugin to display your fan controls in a button row.",
  preview: false,
});

const LitElement = customElements.get("ha-panel-lovelace") ? Object.getPrototypeOf(customElements.get("ha-panel-lovelace")) : Object.getPrototypeOf(customElements.get("hc-lovelace"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;


class CustomFanModeRow extends LitElement {

	constructor() {
		super();
		this._config = {
			customTheme: false,
			customSetpoints: false,
			reverseButtons: false,
			width: '30px',
			height: '30px',
			twoModeFan: false,
			hideOff: false,
			sendStateWithMode: false,
			allowDisablingButtons: true,
			customModes: false,
			customText: false,
			modeOff: "none",
			modeOne: "low",
			modeTwo: "medium",
			modeThree: "high",
			isOffColor: '#f44c09',
			isOnModeOneColor: '#43A047',
			isOnModeTwoColor: '#43A047',
			isOnModeThreeColor: '#43A047',
			buttonInactiveColor: '#759aaa',
			customOffText: 'OFF',
			customModeOneText: 'LOW',
			customModeTwoText: 'MED',
			customModeThreeText: 'HIGH',
			customOffText: 'OFF',
			customLowText: 'LOW',
			customMedText: 'MED',
			customHiText: 'HIGH',
		};
	}
	
	static get properties() {
		return {
			hass: Object,
			_config: Object,
			_stateObj: Object,
			_modeOff: String,
			_modeOne: String,
			_modeTwo: String,
			_modeThree: String,
			_width: String,
			_height: String,
			_leftColor: String,
			_midLeftColor: String,
			_midRightColor: String,
			_rightColor: String,
			_leftText: String,
			_midLeftText: String,
			_midRightText: String,
			_rightText: String,
			_leftName: String,
			_midLeftName: String,
			_midRightName: String,
			_rightName: String,
			_leftState: Boolean,
			_midLeftState: Boolean,
			_midRightState: Boolean,
			_rightState: Boolean,
			_hideLeft: Boolean,
			_hideMidLeft: Boolean,
			_hideMidRight: Boolean,
			_hideRight: Boolean,
		};
	}

	static get styles() {
		return css`
			:host {
				line-height: inherit;
			}
			.box {
				display: flex;
				flex-direction: row;
			}
			.mode {
				margin-left: 2px;
				margin-right: 2px;
				background-color: #759aaa;
				border: 1px solid lightgrey; 
				border-radius: 4px;
				font-size: 10px !important;
				color: inherit;
				text-align: center;
				float: left !important;
				padding: 1px;
				cursor: pointer;
			}
		`;
	}

	render() {
		return html`
			<hui-generic-entity-row .hass="${this.hass}" .config="${this._config}">
				<div id='button-container' class='box'>
					<button
						class='mode'
						style='${this._leftColor};min-width:${this._width};max-width:${this._width};height:${this._height};${this._hideLeft}'
						toggles name="${this._leftName}"
						@click=${this.setMode}
						.disabled=${this._leftState}>${this._leftText}</button>
					<button
						class='mode'
						style='${this._midLeftColor};min-width:${this._width};max-width:${this._width};height:${this._height};${this._hideMidLeft}'
						toggles name="${this._midLeftName}"
						@click=${this.setMode}
						.disabled=${this._midLeftState}>${this._midLeftText}</button>
					<button
						class='mode'
						style='${this._midRightColor};min-width:${this._width};max-width:${this._width};height:${this._height};${this._hideMidRight}'
						toggles name="${this._midRightName}"
						@click=${this.setMode}
						.disabled=${this._midRightState}>${this._midRightText}</button>
					<button
						class='mode'
						style='${this._rightColor};min-width:${this._width};max-width:${this._width};height:${this._height};${this._hideRight}'
						toggles name="${this._rightName}"
						@click=${this.setMode}
						.disabled=${this._rightState}>${this._rightText}</button>
				</div>
			</hui-generic-entity-row>
		`;
	}

	firstUpdated() {
		super.firstUpdated();
		this.shadowRoot.getElementById('button-container').addEventListener('click', (ev) => ev.stopPropagation());
	}

	setConfig(config) {
		this._config = { ...this._config, ...config };
	}

	updated(changedProperties) {
		if (changedProperties.has("hass")) {
			this.hassChanged();
		}
	}

	hassChanged(hass) {

		const config = this._config;
		const stateObj = this.hass.states[config.entity];
		const custTheme = config.customTheme;
		const sendStateWithMode = config.sendStateWithMode;
		const revButtons = config.reverseButtons;
		const custModes = config.customModes;
		const custText = config.customText;
		const twoModes = config.twoModeFan;
		const hide_Off = config.hideOff;
		const buttonWidth = config.width;
		const buttonHeight = config.height;
		const onM1Clr = config.isOnModeOneColor;
		const onM2Clr = config.isOnModeTwoColor;
		const onM3Clr = config.isOnModeThreeColor;
		const offClr = config.isOffColor;
		const buttonOffClr = config.buttonInactiveColor;
		const mOff = config.modeOff;
		const m1 = config.modeOne;
		const m2 = config.modeTwo;
		const m3 = config.modeThree;
		const custOffTxt = config.customOffText;
		const custM1Txt = config.customModeOneText;
		const custM2Txt = config.customModeTwoText;
		const custM3Txt = config.customModeThreeText;
						
		let offstate;
		let mode1;
		let mode2;
		let mode3;
		
		if (custModes) {
			if (stateObj && stateObj.attributes) {
				if (stateObj.state == 'on' && stateObj.attributes.preset_mode == m1 ) {
					mode1 = 'on';
				} else if (stateObj.state == 'on' && stateObj.attributes.preset_mode == m2 ) {
					mode2 = 'on';
				} else if (stateObj.state == 'on' && stateObj.attributes.preset_mode == m3 ) {
					mode3 = 'on';
				} else {
					offstate = 'on';
				}	
			}
		} else {
			if (stateObj && stateObj.attributes) {
				if (stateObj.state == 'on' && stateObj.attributes.preset_mode == "low" ) {
					mode1 = 'on';
				} else if (stateObj.state == 'on' && stateObj.attributes.preset_mode == "medium" ) {
					mode2 = 'on';
				} else if (stateObj.state == 'on' && stateObj.attributes.preset_mode == "high" ) {
					mode3 = 'on';
				} else {
					offstate = 'on';
				}	
			}
		}
		
		let offtext;
		let m1text;
		let m2text;
		let m3text;
		
		if (custText) {
			offtext = custOffTxt;
			m1text = custM1Txt;
			m2text = custM2Txt;
			m3text = custM3Txt;
		} else if (custModes) {
			offtext = mOff;
			m1text = m1;
			m2text = m2;
			m3text = m3;
		} else {
			offtext = "OFF";
			m1text = "LOW";
			m2text = "MED";
			m3text = "HIGH";
		}
		
		let mode1color;
		let mode2color;
		let mode3color;
		let offcolor;

				
		if (custTheme) {
			if (mode1 == 'on') {
				mode1color = 'background-color:' + onM1Clr;
			} else {
				mode1color = 'background-color:' + buttonOffClr;
			}
			if (mode2 == 'on') {
				mode2color = 'background-color:'  + onM2Clr;
			} else {
				mode2color = 'background-color:' + buttonOffClr;
			}
			if (mode3 == 'on') {
				mode3color = 'background-color:'  + onM3Clr;
			} else {
				mode3color = 'background-color:' + buttonOffClr;
			}
			if (offstate == 'on') {
				offcolor = 'background-color:'  + offClr;
			} else {
				offcolor = 'background-color:' + buttonOffClr;
			}
		} else {
			if (mode1 == 'on') {
				mode1color = 'background-color: var(--switch-checked-color)';
			} else {
				mode1color = 'background-color: var(--switch-unchecked-color)';
			}
			if (mode2 == 'on') {
				mode2color = 'background-color: var(--switch-checked-color)';
			} else {
				mode2color = 'background-color: var(--switch-unchecked-color)';
			}
			if (mode3 == 'on') {
				mode3color = 'background-color: var(--switch-checked-color)';
			} else {
				mode3color = 'background-color: var(--switch-unchecked-color)';
			}
			if (offstate == 'on') {
				offcolor = 'background-color: var(--switch-checked-color)';
			} else {
				offcolor = 'background-color: var(--switch-unchecked-color)';
			}
		}
		
		let hideoff = 'display:block';
		let nohide = 'display:block';
		
		if (hide_Off) {
			hideoff = 'display:none';
		} else {
			hideoff = 'display:block';
		}
		
		let twomodes_left;
		let twomodes_right;
		
		if (twoModes) {
			if (revButtons) {
				twomodes_right = 'display:none';
				twomodes_left = 'display:block';
			} else {
				twomodes_left = 'display:none';
				twomodes_right = 'display:block';
			}
		} else {
			twomodes_left = 'display:block';
			twomodes_right = 'display:block';
		}

		let buttonwidth = buttonWidth;
		let buttonheight = buttonHeight;
		
		let offname = 'off'
		let m1name = 'mode1'
		let m2name = 'mode2'
		let m3name = 'mode3'
		
		if (revButtons) {
			this._stateObj = stateObj;
			this._leftState = offstate == 'on';
			this._midLeftState = mode1 === 'on';
			this._midRightState = mode2 === 'on';
			this._rightState = mode3 === 'on';
			this._width = buttonwidth;
			this._height = buttonheight;
			this._leftColor = offcolor;
			this._midLeftColor = mode1color;
			this._midRightColor = mode2color;
			this._rightColor = mode3color;
			this._modeOff = mOff;
			this._modeOne = m1;
			this._modeTwo = m2;
			this._modeThree = m3;
			this._leftText = offtext;
			this._midLeftText = m1text;
			this._midRightText = m2text;
			this._rightText = m3text;
			this._leftName = offname;
			this._midLeftName = m1name;
			this._midRightName = m2name;
			this._rightName = m3name;
			this._hideLeft = hideoff;
			this._hideMidLeft = twomodes_left;
			this._hideMidRight = twomodes_right;
			this._hideRight = nohide;
		} else {
			this._stateObj = stateObj;
			this._leftState = mode3 == 'on';
			this._midLeftState = mode2 === 'on';
			this._midRightState = mode1 === 'on';
			this._rightState = offstate === 'on';
			this._width = buttonwidth;
			this._height = buttonheight;
			this._leftColor = mode3color;
			this._midLeftColor = mode2color;
			this._midRightColor = mode1color;
			this._rightColor = offcolor;
			this._modeOff = mOff;
			this._modeOne = m1;
			this._modeTwo = m2;
			this._modeThree = m3;
			this._leftText = m3text;
			this._midLeftText = m2text;
			this._midRightText = m1text;
			this._rightText = offtext;
			this._leftName = m3name;
			this._midLeftName = m2name;
			this._midRightName = m1name;
			this._rightName = offname;
			this._hideLeft = nohide;
			this._hideMidLeft = twomodes_left;
			this._hideMidRight = twomodes_right;
			this._hideRight = hideoff;
		}
	}

	setMode(e) {
		const mode = e.currentTarget.getAttribute('name');
		const param = {entity_id: this._config.entity};
		if(mode == 'off' ){
			this.hass.callService('fan', 'turn_off', param);
		} else {
			if (this._config.sendStateWithMode) {
				this.hass.callService('fan', 'turn_on', param);
			} if (mode == 'mode1') {
				param.preset_mode = this._modeOne;
				this.hass.callService('fan', 'set_preset_mode', param);
			} else if (mode == 'mode2') {
				param.preset_mode = this._modeTwo;
				this.hass.callService('fan', 'set_preset_mode', param);
			} else if (mode == 'mode3') {
				param.preset_mode = this._modeThree;
				this.hass.callService('fan', 'set_preset_mode', param);
			}
		}
	}
}
	
customElements.define('fan-mode-button-row', CustomFanModeRow);
