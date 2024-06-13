// assets
import { IconUser, IconHome } from '@tabler/icons-react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// constant
const icons = {
  IconUser,
  IconHome,
  InfoOutlinedIcon
};

// ==============================|| SECTIONS MENU ITEMS ||============================== //

const sections = {
  id: 'sections',
  title: 'Sections',
  type: 'group',
  children: [
    {
      id: 'hero',
      title: 'Accueil',
      type: 'item',
      url: '/section/hero',
      icon: icons.IconHome,
      breadcrumbs: false
    },
    {
      id: 'about',
      title: 'À propos',
      type: 'item',
      url: '/section/about',
      icon: icons.InfoOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'overview',
      title: 'Aperçu',
      type: 'item',
      url: '/section/overview',
      icon: icons.InfoOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'approche',
      title: 'Notre approche',
      type: 'item',
      url: '/section/approche',
      icon: icons.InfoOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default sections;
