import { UpgradePackageItem } from 'components/UpgradePackage/UpgradePackageItem'
import AdminLayout from 'layouts/AdminLayout'

export default function Upgrade() {
  const packages = [
    {
      id: 1,
      packageName: 'ESSENTIALS',
      price: '0',
      items: [
        {
          id: 1,
          title: 'قابلیت آپلود 1 تارگت',
          isIncluded: true,
        },

        {
          id: 2,
          title: 'پشتیبانی تیکت',
          isIncluded: true,
        },
        {
          id: 3,
          title: 'پشتیبانی از نسخه اندروید و IOS',
          isIncluded: true,
        },
        {
          id: 4,
          title: 'قابلیت اضافه کردن 1محتوای گالری تصاویر',
          isIncluded: true,
        },
        {
          id: 5,
          title: 'قابلیت اضافه کردن 1محتوای ویدئویی',
          isIncluded: true,
        },
      ],
    },
    {
      id: 2,
      packageName: 'PROFESSIONAL',
      price: '۳۵۰,۰۰۰',
      items: [
        {
          id: 1,
          title: 'قابلیت آپلود 5 تارگت',
          isIncluded: true,
        },

        {
          id: 2,
          title: 'پشتیبانی تیکت',
          isIncluded: true,
        },
        {
          id: 3,
          title: 'پشتیبانی از نسخه اندروید و IOS',
          isIncluded: true,
        },
        {
          id: 4,
          title: 'قابلیت اضافه کردن 4محتوای گالری تصاویر',
          isIncluded: true,
        },
        {
          id: 5,
          title: 'قابلیت اضافه کردن3 محتوای ویدئویی',
          isIncluded: true,
        },
        {
          id: 6,
          title: 'قابلیت اضافه کردن 3محتوای سه بعدی',
          isIncluded: true,
        },
      ],
    },
    {
      id: 3,
      packageName: 'ENTERPRISE',
      price: '۳,۵۰۰,۰۰۰',
      items: [
        {
          id: 1,
          title: 'قابلیت آپلود 20 تارگت',
          isIncluded: true,
        },

        {
          id: 2,
          title: 'پشتیبانی تیکت',
          isIncluded: true,
        },
        {
          id: 3,
          title: 'پشتیبانی از نسخه اندروید و IOS',
          isIncluded: true,
        },
        {
          id: 4,
          title: 'قابلیت اضافه کردن 15محتوای گالری تصاویر',
          isIncluded: true,
        },
        {
          id: 5,
          title: 'قابلیت اضافه کردن15 محتوای ویدئویی',
          isIncluded: true,
        },
        {
          id: 6,
          title: 'قابلیت اضافه کردن 10محتوای سه بعدی',
          isIncluded: true,
        },
      ],
    },
    {
      id: 4,
      packageName: 'EXTRA',
      price: 'تماس بگیرید',
      items: [],
    },
  ]
  return (
    <>
      <AdminLayout>
        <div className="container mx-auto py-2 text-center">
          <h3 className="font-medium text-3xl text-gray-600 mb-5">
            پکیج های XREALITY
          </h3>
          <p className="text-gray-500 font-medium text-lg mb-8">
            تنها با چند کلیک می‌توانید از میان یکی از 3 بسته‌ی زیر، پلن‌ مورد
            نیاز خود را انتخاب و در هزینه‌های‌تان صرفه‌جویی کنید.
          </p>

          <div className="grid grid-cols-4 gap-4">
            {packages.map((item) => (
              <UpgradePackageItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </AdminLayout>
    </>
  )
}
