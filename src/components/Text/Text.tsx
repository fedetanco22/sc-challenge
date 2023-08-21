import { memo, ReactNode } from 'react'
import style from './Text.module.css'

type Element = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'a';
type Variant = 'text' | 'headline-1' | 'headline-2' | 'headline-4' | 'body-1' | 'body-2' | 'caption' | 'caption-2' | 'hairline';
type FontWeight = 'normal' | 'medium' | 'bold' | 'extra-bold';
type Alignment = 'left' | 'center';
type Color = 'white' | 'light' | 'primary' | 'secondary';

type TextProps = {
  /** Text to display */
  children: ReactNode;
  alignment?: Alignment;
  color?: Color;
  fontWeight?: FontWeight;
  id?: string;
  as?: Element;
  variant?: Variant;
  className?: string;
}

const Text = ({
  children,
  id,
  color = 'white',
  alignment = 'left',
  fontWeight,
  variant = 'text',
  as: AsComponent = 'span',
  className
}: TextProps) => {
  return (
    <AsComponent
      className={`
        ${style.text}
        ${variant && style[variant]}
        ${color && style[color]}
        ${fontWeight && style[fontWeight]}
        ${alignment && style[alignment]}
        ${className}
      `}
      {...(id && { id })}
    >
      {children}
    </AsComponent>
  )
}

export default memo(Text)
