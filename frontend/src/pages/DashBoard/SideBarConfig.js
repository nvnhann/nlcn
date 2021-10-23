import { Icon } from '@iconify/react';
import React from 'react';
const color = '#6b7280';

const getIcon = (name, color) => <Icon icon={name} width={22} height={22} color={color} />;

const SideBarConfig = [
  {
    title: 'Thông tin khách hàng',
    path: '/dashboard/user',
    icon: getIcon('majesticons:user-group', color),
  },
  {
    title: 'Tác giả',
    path: '/dashboard/tacgia',
    icon: getIcon('carbon:user-filled', color),
  },
  {
    title: 'Sách',
    path: '/dashboard/book',
    icon: getIcon('dashicons:book-alt', color),
  },
  {
    title: 'Hóa đơn',
    path: '/dashboard/hoadon',
    icon: getIcon('icon-park-outline:bill', color),
  },
  {
    title: 'Khuyến mãi',
    path: '/dashboard/sale',
    icon: getIcon('whh:sale', color),
  },
  {
    title: 'Nhà cung cấp',
    path: '/dashboard/nhacungcap',
    icon: getIcon('fa-solid:house-user', color),
  },
  {
    title: 'Nhà xuất bản',
    path: '/dashboard/nhaxuatban',
    icon: getIcon('ci:user-square', color),
  },
  {
    title: 'Ngôn ngữ',
    path: '/dashboard/ngonngu',
    icon: getIcon('tabler:language', color),
  },
  {
    title: 'Nhóm thể loại',
    path: '/dashboard/nhomtheloai',
    icon: getIcon('ic:outline-category', color),
  },
  {
    title: 'Thể loại',
    path: '/dashboard/theloai',
    icon: getIcon('dashicons:category', color),
  },
  {
    title: 'Kích thướt sách',
    path: '/dashboard/kichthuot',
    icon: getIcon('mdi:resize', color),
  },
];

export default SideBarConfig;
