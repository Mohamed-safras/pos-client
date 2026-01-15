export interface NavigationLinkProps {
  href: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  name: string;
  children?: React.ReactNode;
}

export interface BackgroundLetterAvatarProps {
  name: string;
}
