import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

type PanelHeadingProps = {
  eyebrow: string
  title: string
  link?: string
  linkLabel?: string
}

export function PanelHeading({ eyebrow, title, link, linkLabel }: PanelHeadingProps) {
  return (
    <div className="panel-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
      </div>
      {link && (
        <Link className="panel-link" to={link}>
          {linkLabel} <ChevronRight size={14} />
        </Link>
      )}
    </div>
  )
}