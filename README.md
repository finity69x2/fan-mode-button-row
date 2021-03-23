# Fan Mode Button Row
Provides a means to program 3 preset mode settings for fans selectable from a Lovelace button row.

## NOTE: You must be on Home Assistant V2021.3.X or higher to use this plug-in

Installation:

The easiest way to install this is to use the Home Assistant Community Store (HACS) in Home Assistant.

Follow the instructions there for installation making sure you note the "url:" section for the resources addition.


Conversely, if you don't use HACS you can install it manually by performing the following:

Copy the fan-mode-button-row.js file to the appropriate folder in your Home Assistant Configuration directory (/config/www/).

Place the following in your "resources" section in your lovelace configuration (updating the location to where you placed the above file):

  ```
    - url: /local/fan-mode-button-row.js
      type: module
  ```
    
Then to use this in a card place the following in your entity card:


<b>Options:</b>

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| entity | String | Yes | none | any fan entity_id |
| type | String | Yes | none | custom:fan-mode-button-row |
| mode1 | String | Yes | ?? | Sets the mode for the "Mode 1" button |
| mode2 | String | Yes | ?? | Sets the mode for the "Mode 2" button |
| mode3 | String | Yes | ?? | Sets the mode for the "Mode 3" button |
| mode4 | String | Yes | ?? | Sets the mode for the "Mode 4" button |
| name | String | No | none | A custom name for the entity in the row |
| customTheme | Boolean | No | false | set to true to use a custom theme |
| reverseButtons | Boolean | No | false | set to true to reverse the button order |
| isOnMode1Color | String | No | '#43A047' | Sets the color of the 'Mode 1' button if fan is on Mode 1 |
| isOnMode2Color | String | No | '#43A047' | Sets the color of the 'Mode 2' button if fan is on Mode 2 |
| isOnmode3Color | String | No | '#43A047' | Sets the color of the 'Mode 3' button if fan is on Mode 3 |
| isOnmode4Color | String | No | '#43A047' | Sets the color of the 'Mode 4' button if fan is on Mode 4 |
| buttonInactiveColor | String | No | '#759aaa' | Sets the color of the the buttons if that selection is not "active" |
| customMode1Text | String | No | 'Mode 1' | Sets the text of the "Mode 1" button |
| customMode2Text | String | No | 'Mode 2' | Sets the text of the "Mode 2" button |
| customMode3Text | String | No | 'Mode 3' | Sets the text of the "Mode 3" button |
| customMode4Text | String | No | 'Mode 4' | Sets the text of the "Mode 4" button |


The values for the colors can be any valid color string in "HEX", "RGB" or by color name.

If the mode is changed via any other means (slider, service call, etc) the buttons will indicate which mode it is in.

<b>Configuration Examples:</b>
    
  ```
    cards:
      - type: entities
        title: Hall Fan Mode Presets
        show_header_toggle: false
        entities:
        ## USE THIS CONFIG TO HAVE IT MATCH YOUR THEME ##
          - entity: fan.hall_fan
            type: custom:fan-mode-button-row
            name: Fan Not Custom Theme
            mode1: ??
            mode2: ??
            mode3: ??
            mode4: ??
        ## USE THIS CONFIG TO USE A DEFAULT CUSTOM THEME
          - entity: fan.hall_fan
            type: custom:fan-mode-button-row
            name: Fan Default Custom Theme
            mode1: ??
            mode2: ??
            mode3: ??
            mode4: ??
            customTheme: true
        ## USE THIS CONFIG TO USE A 'CUSTOMZED' CUSTOM THEME
          - entity: fan.hall_fan
            type: custom:fan-mode-button-row
            name: Fan Custom Custom Theme
            mode1: ??
            mode2: ??
            mode3: ??
            mode4: ??
            reverseButtons: true
            customTheme: true
            isOnMode1Color: 'rgb(255, 0, 0)'
            isOnMode2Color: '#888888'
            isOnMode3Color: '#222222'
            isOnMode4Color: 'purple'
            buttonInactiveColor: '#aaaaaa'
            
        ## USE THIS CONFIG TO SET CUSTOM BUTTON TEXT (NOT REQUIRED TO SET "customTheme: true" TO USE THESE )
          - entity: fan.hall_fan
            type: custom:fan-mode-button-row
            name: Fan Custom Button Text
            mode1: ??
            mode2: ??
            mode3: ??
            mode4: ??
            customMode1Text: me
            customMode2Text: do
            customMode3Text: re
            customMode4Text: not
            
  ```

This is with the default Lovelace frontend theme set:

![Default](images/fan_mode_default.jpg)

This is with the "Slate" frontend theme set:

![Slate](images/fan_mode_default_2.jpg)

This is how this plugin looks with the plugin fully themed:

![Slate-Themed](images/fan_mode_themed.jpg)

