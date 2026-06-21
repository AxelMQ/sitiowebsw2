import * as Icons from 'lucide-react';

export default function DynamicIcon({ name, ...props }) {
  const IconComponent = Icons[name];
  if (!IconComponent) {
    return <Icons.HelpCircle {...props} />;
  }
  return <IconComponent {...props} />;
}
