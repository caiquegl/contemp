interface Window {
    gtranslateSettings?: {
      default_language: string;
      native_language_names: boolean;
      detect_browser_language: boolean;
      languages: string[];
      wrapper_selector: string;
      switcher_vertical_position: string;
      float_switcher_open_direction: string;
      alt_flags: { [key: string]: string };
    };
  }
  