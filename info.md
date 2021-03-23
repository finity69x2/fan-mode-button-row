Provides a means to program 3 preset speed percentage settings for fans selectable from a Lovelace button row. 

## NOTE: You must be on Home Assistant V2021.3.X or higher to use this plug-in

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
