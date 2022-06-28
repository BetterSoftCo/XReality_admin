import { CameraIcon, CubeIcon, VideoCameraIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function TargetItem({ target }: any) {
  const [pic, setPic] = useState('/images/default.jpg')

  useEffect(() => {
    var picLink = target.media.map((media: any) => {
      return media.link
    })
      
    if(picLink[0]){
      console.log('eeeeeeeeeeeeeee');
      // setPic('/images/logo.png')
      // console.log('picLink[0]',picLink[0]);
      setPic(picLink[0])
    }else{
      setPic("/images/default.jpg")
    }
  })


	return (
		<>
			<div>
        <div className="inline-block rounded-lg overflow-hidden">
          <a
            href=""
            className="block p-4 rounded-lg border border-gray-200"
          >
            { console.log('pic', pic)}
            
            <Image
              alt=""
              src={pic}
              width={500}
              height={400}
              className="w-full h-56 rounded-md"
            />
            <div className="mt-2">
              <dl>
                <div>
                  {/* عنوان */}
                  <dd className="font-medium text-2xl text-indigo-800">
                    {target.title}
                  </dd>
                </div>
              </dl>
              <dl className="flex justify-center items-center gap-x-2 mt-6 text-xs">
                {/* گالری تصویر */}
                <div className="flex justify-between items-center gap-x-2">
                  <CameraIcon className="w-5 h-5 text-gray-300" />
                  <div className="sm:ml-3 mt-1.5 sm:mt-0">
                    <dt className="text-gray-500">تصویر</dt>
                    <dd className="font-medium">2</dd>
                  </div>
                </div>
                {/* ویدئو */}
                <div className="flex justify-between items-center gap-x-2">
                  <VideoCameraIcon className="w-5 h-5 text-gray-300" />
                  <div className="sm:ml-3 mt-1.5 sm:mt-0">
                    <dt className="text-gray-500">ویدئو</dt>
                    <dd className="font-medium">2</dd>
                  </div>
                </div>
                {/* سه بعدی */}
                <div className="flex justify-between items-center gap-x-2">
        ``          <CubeIcon className="w-5 h-5 text-gray-300" />
``                      <div className="sm:ml-3 mt-1.5 sm:mt-0">
                    <dt className="text-gray-500">سه بعدی</dt>
                    <dd className="font-medium">4</dd>
                  </div>
                </div>
              </dl>
            </div>
          </a>
        </div>
			</div>
		</>
	)
}
