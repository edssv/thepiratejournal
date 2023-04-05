import { useMutation } from '@tanstack/react-query';

import { instance } from '@/api/api.interceptor';
import { getApiUrl } from '@/lib/apiUrlBuilder';

interface FileData {
  file: { url: string; ref: string };
}

export const FileService = {
  async uploadFile(formData: FormData) {
    const { data } = await instance<FileData>({
      url: getApiUrl.fileUpload(),
      method: 'POST',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};

export const useUploadFileMutation = () => {
  return useMutation(['upload'], FileService.uploadFile);
};
