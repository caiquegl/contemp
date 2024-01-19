declare module 'rc-select' {
    interface OptionProps {
      value?: string;
      children?: React.ReactNode;
      // Adicione outras propriedades conforme necessário
    }
  
    interface SelectProps {
      showSearch?: boolean;
      placeholder?: string;
      optionFilterProp?: string;
      value?: string | string[];
      onChange?: (value: string | string[] | null) => void;
      filterOption?: (input: string, option: OptionProps) => boolean;
      dropdownStyle?: React.CSSProperties;
      style?: React.CSSProperties;
      // Adicione outras propriedades conforme necessário
    }
  
    export class Select extends React.Component<SelectProps> {
      // Adicione métodos e propriedades adicionais conforme necessário
    }
  
    export class Option extends React.Component<OptionProps> {
      // Adicione métodos e propriedades adicionais conforme necessário
    }
  }
  