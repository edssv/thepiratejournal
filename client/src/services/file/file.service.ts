import { getApiUrl } from '@/lib/apiUrlBuilder';
import { api } from '../api/api';

interface FileData {
  file: { url: string; ref: string };
}

export const fileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<FileData, FormData>({
      query: (formData: FormData) => ({
        url: getApiUrl.fileUpload(),
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = fileApi;
