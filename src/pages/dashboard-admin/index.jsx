import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import HomeBredCurbs from "./HomeBredCurbs";
import { useGetDataMutation } from "@/store/api/app/appSlice";
import Loading from "@/components/Loading";


const DashboardAdmin = () => {
  const [getData, { isLoading, isError, error, isSuccess }] = useGetDataMutation();
  const [totalPeserta, setTotalPeserta] = useState();
  const [totalIkutTes, setTotalIkutTes] = useState();
  const [totalBelumTes, setTotalBelumTes] = useState();
  useEffect(() => {
   
    async function fetchData() {
      console.log('tes')
      const response = await getData('/count-data');
      console.log('response dashboard', response)
      setTotalPeserta(response.data.data.total_peserta)
      setTotalIkutTes(response.data.data.total_ikut_tes)
      setTotalBelumTes(response.data.data.total_belum_tes)
    }
    fetchData();
  }, [])
  return (
    <div>
      <HomeBredCurbs title="Dashboard" />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-12 gap-5 mb-5">
        
        <div className="2xl:col-span-9 lg:col-span-8 col-span-12">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <Card bodyClass="pt-4 pb-3 px-4">
            <div className="flex space-x-3 rtl:space-x-reverse">
              <div className="flex-none">
                <div
                  className="bg-[#E5F9FF] dark:bg-slate-900	text-info-500 h-12 w-12 rounded-full flex flex-col items-center justify-center text-2xl"
                >
                  <Icon icon="heroicons:users" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-slate-600 dark:text-slate-300 text-sm mb-1 font-medium">
                Total Peserta
                </div>
                <div className="text-slate-900 dark:text-white text-lg font-medium">
                  {totalPeserta}
                </div>
              </div>
            </div>
            <div className="ltr:ml-auto rtl:mr-auto max-w-[124px]">
              {/* test */}
            </div>
          </Card>

          <Card bodyClass="pt-4 pb-3 px-4">
            <div className="flex space-x-3 rtl:space-x-reverse">
              <div className="flex-none">
                <div
                  className="bg-[#E5F9FF] dark:bg-slate-900	text-info-500 h-12 w-12 rounded-full flex flex-col items-center justify-center text-2xl"
                >
                  <Icon icon="heroicons:users" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-slate-600 dark:text-slate-300 text-sm mb-1 font-medium">
                Total Ikut Test
                </div>
                <div className="text-slate-900 dark:text-white text-lg font-medium">
                  {totalIkutTes}
                </div>
              </div>
            </div>
            <div className="ltr:ml-auto rtl:mr-auto max-w-[124px] max-h-[300px]">
              {/* test */}
            </div>
          </Card>

          <Card bodyClass="pt-4 pb-3 px-4">
            <div className="flex space-x-3 rtl:space-x-reverse">
              <div className="flex-none">
                <div
                  className="bg-[#E5F9FF] dark:bg-slate-900	text-info-500 h-12 w-12 rounded-full flex flex-col items-center justify-center text-2xl"
                >
                  <Icon icon="heroicons:users" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-slate-600 dark:text-slate-300 text-sm mb-1 font-medium">
                Total Belum Test
                </div>
                <div className="text-slate-900 dark:text-white text-lg font-medium">
                  {totalBelumTes}
                </div>
              </div>
            </div>
            <div className="ltr:ml-auto rtl:mr-auto max-w-[124px]">
              {/* test */}
            </div>
          </Card>
            
          </div>
        </div>
      </div>
      )}
      
      
      
    </div>
  );
};

export default DashboardAdmin;
