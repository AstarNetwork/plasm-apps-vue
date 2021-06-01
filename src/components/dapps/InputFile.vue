<template>
  <div
    class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-darkGray-500 border-dashed rounded-md bg-blue-50 dark:bg-darkGray-800"
  >
    <div class="space-y-1 text-center">
      <icon-document />
      <div class="flex text-sm text-gray-500 dark:text-darkGray-400">
        <div v-if="file">File : {{ file.name }}</div>
        <div v-else>
          <div v-bind="getRootProps()">
            <input v-bind="getInputProps()" />
            <div
              class="relative cursor-pointer rounded-md font-medium text-blue-500 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300 focus-within:ring-offset-none"
            >
              Upload a file
            </div>
            <p v-if="isDragActive">Drop the files here ...</p>
            <p class="pl-1" v-else>or drag and drop</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import IconDocument from '@/components/icons/IconDocument.vue';
import { hexToU8a, isHex, u8aToString } from '@polkadot/util';
import { useDropzone } from 'vue3-dropzone';

export default defineComponent({
  components: {
    IconDocument,
  },
  props: {
    file: {
      type: Object,
    },
    extension: {
      type: Array as () => string | string[],
      required: true,
    },
  },
  setup(props, { emit }) {
    const BYTE_STR_0 = '0'.charCodeAt(0);
    const BYTE_STR_X = 'x'.charCodeAt(0);
    const STR_NL = '\n';
    const NOOP = (): void => undefined;

    function convertResult(result: ArrayBuffer): Uint8Array {
      const data = new Uint8Array(result);

      // this converts the input (if detected as hex), via the hex conversion route
      if (data[0] === BYTE_STR_0 && data[1] === BYTE_STR_X) {
        let hex = u8aToString(data);

        while (hex[hex.length - 1] === STR_NL) {
          hex = hex.substr(0, hex.length - 1);
        }

        if (isHex(hex)) {
          return hexToU8a(hex);
        }
      }

      return data;
    }

    const onDrop = (files: any, rejectReasons: any): void => {
      console.log(files);
      console.log(rejectReasons);

      if (rejectReasons.length > 0) {
        alert('file upload is rejected.');
        return;
      }

      files.forEach((file: File): void => {
        const reader = new FileReader();

        reader.onabort = NOOP;
        reader.onerror = NOOP;

        reader.onload = ({ target }: ProgressEvent<FileReader>): void => {
          if (target && target.result) {
            const data = convertResult(target.result as ArrayBuffer);
            const fileState = {
              data,
              name: file.name,
              size: data.length,
            };

            emit('drop-file', fileState);
          }
        };

        reader.readAsArrayBuffer(file);
      });
    };

    const { getRootProps, getInputProps, ...rest } = useDropzone({
      onDrop,
      multiple: false,
      accept: props.extension,
    });

    return {
      onDrop,
      getRootProps,
      getInputProps,
      ...rest,
    };
  },
});
</script>
