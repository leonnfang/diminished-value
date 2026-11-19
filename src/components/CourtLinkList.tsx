import { COURT_LINKS } from "../copy"
import { ExternalLink } from "./ExternalLink"

export function CourtLinkList() {
  return (
    <ul className="link-list">
      {COURT_LINKS.map((link) => (
        <li key={link.href}>
          <ExternalLink href={link.href}>{link.label}</ExternalLink>
          <span>{link.detail}</span>
        </li>
      ))}
    </ul>
  )
}
