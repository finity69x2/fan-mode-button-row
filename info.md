Provides a means to program 3 preset mode settings for fans selectable from a Lovelace button row. 

## NOTE: You must be on Home Assistant V2021.3.X or higher to use this plug-in

<b>Configuration Examples:</b>
    
  ```
    cards:
      - type: entities
        title: Hall Fan Mode Preset Modes
        show_header_toggle: false
        entities:
        ## USE THIS CONFIG TO HAVE IT MATCH YOUR THEME ##
          - entity: fan.hall_fan
            type: custom:fan-mode-button-row
            name: Fan Not Custom Theme
        ## USE THIS CONFIG TO USE A DEFAULT CUSTOM THEME
          - entity: fan.hall_fan
            type: custom:fan-mode-button-row
            name: Fan Default Custom Theme
            customTheme: true
        ## USE THIS CONFIG TO USE A 'CUSTOMZED' CUSTOM THEME
          - entity: fan.hall_fan
            type: custom:fan-mode-button-row
            name: Fan Custom Custom Theme
            reverseButtons: true
            customTheme: true
            isOnMode1Color: 'rgb(255, 0, 0)'
            isOnMode2Color: '#888888'
            isOnMode3Color: '#222222'
            isOnMode4Color: 'purple'
            buttonInactiveColor: '#aaaaaa'
        ## FULL EXAMPLE CONFIGURATION
          - entity: fan.hall_fan
            type: custom:fan-mode-button-row
            name: Fan Custom Button Text
            twoModeFan: true
            reverseButtons: true
            customTheme: true
            isOnModeOneColor: 'rgb(255, 0, 0)'
            isOnModeTwoColor: '#888888'
            isOnModeThreeColor: '#222222'
            buttonInactiveColor: '#aaaaaa'
            isOffColor: 'purple'
            customModes: true
            modeOff: "brown"
            modeOne: "low"
            modeTwo: "medium"
            modeThree: "high"
            customText: true
            customOffText: 'NAY'
            customModeOneText: '1'
            customModeTwoText: 'mid'
            customModeThreeText: 'Fast'
            width: '15px'
            height: '15px'
            
  ```

Please see my fan packages in my Home-Assistant Repo for example configurations to use the above plugin configurations.

https://github.com/finity69x2/Home-Assistant/tree/master/packages

Examples of the above plugion configurations:

![FanModeExamples](images/fan-mode-button-row.jpg)
