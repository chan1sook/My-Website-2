<template>
  <div>
    <div class="h-screen p-4 flex flex-col gap-2">
      <h1 class="text-2xl font-bold line-clamp-1 text-ellipsis">ระบบสารสนเทศโรงเรียน สพป ลพบุรี เขต 1</h1>
      <div class="border rounded p-2">
        <div class="flex flex-row gap-2 items-center">
          <label class="whitespace-nowrap">กรองตามชื่อโรงเรียน</label>
          <input v-model="searchKeyword" type="search"
            class="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ชื่อโรงเรียน" />
        </div>
      </div>
      <div class="flex-1 flex flex-col md:flex-row gap-2 max-h-[80vh] relative">
        <div class="flex-1 md:flex-[2] h-[50%] md:h-full overflow-y-auto border rounded p-2">
          <div class="font-bold">กรองตามอำเภอ</div>
          <div>
            <div class="flex items-center gap-2">
              <button type="button" @click="selectProvincesAll"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">เลือกทั้งหมด</button>
              <button type="button" @click="clearProvincesAll"
                class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">ล้างทั้งหมด</button>
            </div>
            <div v-for="( province, i ) in provinces " :key="i" class="flex items-center gap-2">
              <input v-model="filterProvinces" type="checkbox" :value="province"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label>{{ province }}</label>
            </div>
          </div>
          <div class="font-bold">กรองตามกลุ่มโรงเรียน</div>
          <div>
            <div class="flex items-center gap-2">
              <button type="button" @click="selectSchoolGroupsAll"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">เลือกทั้งหมด</button>
              <button type="button" @click="clearSchoolGroupsAll"
                class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">ล้างทั้งหมด</button>
            </div>
            <div v-for="( group, i ) in schoolGroups " :key="i" class="flex items-center gap-2">
              <input v-model="filterSchoolGroups" type="checkbox" :value="group"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label>{{ group }}</label>
            </div>
          </div>
          <div class="font-bold">กรองตามขนาด</div>
          <div>
            <div class="flex items-center gap-2">
              <button type="button" @click="selectSchoolSizesAll"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">เลือกทั้งหมด</button>
              <button type="button" @click="clearSchoolSizesAll"
                class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">ล้างทั้งหมด</button>
            </div>
            <div v-for="( size, i ) in schoolSizes " :key="i" class="flex items-center gap-2">
              <input v-model="filterSchoolSizes" type="checkbox" :value="size"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label>{{ size }}</label>
            </div>
          </div>
        </div>
        <div class="flex-1 md:flex-[3] h-[50%] md:h-full flex flex-col border rounded p-2">
          <div class="font-bold">รายชื่อ</div>
          <hr />
          <div class="flex-1 overflow-y-auto">
            <div v-for="( row, i ) of filterData " :key="i" class="my-2">
              <div>
                <div>{{ i + 1 }}. โรงเรียน{{ row.school_name }} </div>
                <div>
                  <span
                    class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {{ row.province }}
                  </span>
                  <span
                    class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    {{ row.school_group }}
                  </span>
                  <span
                    class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                    ขนาด{{ row.school_size }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import lopburi1schData from "~/data/lopburi1sch";

useHead({
  title: "chan1sook.com - ระบบสารสนเทศโรงเรียน สพป ลพบุรี เขต 1",
  meta: [
    {
      name: 'description', content: 'ระบบสารสนเทศโรงเรียน สพป ลพบุรี เขต 1'
    }
  ],
})

const provinces = lopburi1schData.reduce((arr, current) => {
  if (!arr.includes(current.province)) {
    arr.push(current.province);
  }
  return arr;
}, <string[]>[]);
const schoolGroups = lopburi1schData.reduce((arr, current) => {
  if (!arr.includes(current.school_group)) {
    arr.push(current.school_group);
  }
  return arr;
}, <string[]>[]);
const schoolSizes = lopburi1schData.reduce((arr, current) => {
  if (!arr.includes(current.school_size)) {
    arr.push(current.school_size);
  }
  return arr;
}, <string[]>[]);

const searchKeyword = ref("");
const filterSchoolGroups = ref(schoolGroups.slice(0));
const filterProvinces = ref(provinces.slice(0));
const filterSchoolSizes = ref(schoolSizes.slice(0));

const filterData = computed(() => {
  let filteredData = lopburi1schData.slice();
  filteredData = filteredData.filter((row) => row.school_name.includes(searchKeyword.value));
  filteredData = filteredData.filter((row) => filterSchoolGroups.value.includes(row.school_group));
  filteredData = filteredData.filter((row) => filterProvinces.value.includes(row.province));
  filteredData = filteredData.filter((row) => filterSchoolSizes.value.includes(row.school_size));
  return filteredData;
})

function selectSchoolGroupsAll() {
  filterSchoolGroups.value = schoolGroups.slice(0);
} function clearSchoolGroupsAll() {
  filterSchoolGroups.value = [];
}

function selectProvincesAll() {
  filterProvinces.value = provinces.slice(0);
}
function clearProvincesAll() {
  filterProvinces.value = [];
}

function selectSchoolSizesAll() {
  filterSchoolSizes.value = schoolSizes.slice(0);
}
function clearSchoolSizesAll() {
  filterSchoolSizes.value = [];
}

</script>

<style>
body {
  font-family: 'Prompt', 'Roboto', sans-serif;
}
</style>