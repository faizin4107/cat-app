import axios from 'axios';
import Swal from "sweetalert2";
import baseurl from '../../constant/baseurl';
import { getTokenFromLocalStorage } from "../../store/localStorage";
import { useCreateDataMutation } from "../../store/api/app/appSlice";

export const confirmTesCancel = () => {
   Swal.fire({
      title: 'Apakah yakin ingin membatalkan?',
      text: `Isi jawaban akan langsung di reset`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
   }).then(async result => {
      if (result.value) {
         window.location.href = '/dashboard-peserta'

      }
   });
};
