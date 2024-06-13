// assets
import { IconInbox } from '@tabler/icons-react';

// constant
const icons = { IconInbox };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const messages = {
  id: 'message',
  title: 'Messages',
  type: 'group',
  children: [
    {
      id: 'message',
      title: 'Messages',
      type: 'item',
      url: '/message',
      icon: icons.IconInbox,
      breadcrumbs: false
    }
  ]
};

export default messages;
