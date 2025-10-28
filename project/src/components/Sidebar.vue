<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  title?: string;
  subtitle?: string;
  items?: Array<{
    text: string;
    route?: string;
    icon?: string;
    id?: string | number;
  }>;
  containerClass?: string;
  headerClass?: string;
  bodyClass?: string;
  itemClass?: string;
  linkClass?: string;
  titleClass?: string;
  subtitleClass?: string;
  footerClass?: string;

  showUserFooter?: boolean;
  userRole?: string;
  logoutButtonText?: string;
  userInfoClass?: string;
  logoutButtonClass?: string;
}>();

const emit = defineEmits<{
  (e: "select", item: { text: string; route?: string; id?: string | number }): void;
  (e: "logout"): void;
}>();

const normalizedItems = computed(() => props.items ?? []);

function handleSelect(item: { text: string; route?: string; id?: string | number }) {
  emit("select", item);
}

function handleLogout() {
  emit("logout");
}
</script>

<template>
  <aside
    :class="
      props.containerClass ??
      'w-64 h-screen flex flex-col justify-between bg-[#111827] text-gray-300 border-r border-gray-800'
    "
  >
    <!-- HEADER -->
    <div>
      <header :class="props.headerClass ?? 'px-6 py-6 border-b border-gray-800 flex flex-col gap-1'">
        <h1 :class="props.titleClass ?? 'text-lg font-bold text-white tracking-tight uppercase select-none'">
          {{ props.title }}
        </h1>
        <p v-if="props.subtitle" :class="props.subtitleClass ?? 'text-sm text-gray-400 font-light select-none'">
          {{ props.subtitle }}
        </p>
      </header>

      <!-- NAVIGATION -->
      <nav :class="props.bodyClass ?? 'mt-5 px-4 flex flex-col gap-1 text-sm font-medium'">
        <ul>
          <li v-for="(item, idx) in normalizedItems" :key="item.id ?? idx" :class="props.itemClass ?? ''">
            <a
              href="javascript:void(0)"
              :class="
                props.linkClass ??
                'group flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 text-gray-400 hover:text-white hover:bg-gray-800/70'
              "
              @click.prevent="handleSelect(item)"
            >
              <i
                v-if="item.icon"
                :class="[
                  'pi',
                  `pi-${item.icon}`,
                  'text-gray-500 text-base group-hover:text-indigo-400 transition-colors duration-200',
                ]"
              />
              <span class="flex-1 group-hover:translate-x-0.5 transition-transform duration-150">
                {{ item.text }}
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- FOOTER -->
    <footer
      v-if="$slots.default || props.showUserFooter"
      :class="props.footerClass ?? 'p-5 border-t border-gray-800 bg-[#0f172a]/60 backdrop-blur-sm text-xs'"
    >
      <slot />

      <div v-if="props.showUserFooter" class="space-y-3">
        <div :class="props.userInfoClass ?? 'text-gray-400'">
          Conectado como: <span class="text-gray-200 font-medium">{{ props.userRole }}</span>
        </div>

        <button
          @click="handleLogout"
          :class="
            props.logoutButtonClass ??
            'w-full flex items-center justify-start gap-2 px-3 py-2 text-sm font-medium text-red-500 hover:text-red-400 hover:bg-red-900/20 rounded-md transition-all duration-200'
          "
        >
          <i class="pi pi-sign-out text-sm" />
          {{ props.logoutButtonText ?? "Cerrar Sesión" }}
        </button>
      </div>
    </footer>
  </aside>
</template>

<style scoped>
aside {
  font-family: "Inter", system-ui, sans-serif;
}

/* Añadimos un toque de animación suave */
a {
  transform: translateX(0);
  transition: transform 0.15s ease;
}
a:hover span {
  transform: translateX(2px);
}
</style>
