// assets
import { FileTextOutlined } from '@ant-design/icons';

// icons
const icons = {
  FileTextOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'document',
      title: 'Document Convert',
      type: 'item',
      url: '/document',
      icon: icons.FileTextOutlined
    }
  ]
};

export default utilities;
