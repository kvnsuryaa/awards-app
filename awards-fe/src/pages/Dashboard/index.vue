<template>
  <div>
    <b-navbar
      toggleable="sm"
      type="light"
      variant="light"
      class="d-flex p-2 ml-auto mr-auto navbar-awards"
      sticky
    >
      <div class="mr-auto h3 mt-auto mb-auto" v-b-toggle.sidebar-backdrop>
        <b-icon icon="filter-left" variant="dark"></b-icon>
      </div>
      <div class="ml-auto h3 mt-auto mb-auto" v-b-modal.modal-1>
        <b-icon icon="filter" variant="dark"></b-icon>
      </div>
    </b-navbar>
    <div class="row justify-content-center mt-3">
      <div class="col-12 col-md-5">
        <Awards
          v-for="(item, i) in awards"
          :key="i"
          :title="item.title"
          :image="item.image"
          :poin="item.poin"
          :type="item.award_type"
        />
      </div>
    </div>
    <b-modal id="modal-1" title="Filter" hide-footer>
      <div
        class="filter-list mb-5"
        v-if="current_filter.poin > 0 || current_filter.type.length > 0"
      >
        <div>
          <div class="filter-item" v-if="current_filter.poin > 0">
            <span class="mr-2"
              >Poin: {{ $formatCurrency(current_filter.poin) }} -
              {{ $formatCurrency(poin.max_poin) }}</span
            >
            <b-icon
              icon="x-circle-fill"
              variant="primary"
              style="cursor: pointer"
              @click="removeFilter('poin')"
            ></b-icon>
          </div>
        </div>
        <!-- <br v-if="current_filter.poin > 0 || current_filter.type.length > 0" /> -->
        <div>
          <div class="filter-item" v-if="current_filter.type.length > 0">
            <span class="mr-2">Type: {{ current_filter.type.join(", ") }}</span>
            <b-icon
              icon="x-circle-fill"
              variant="primary"
              style="cursor: pointer"
              @click="removeFilter('type')"
            ></b-icon>
          </div>
        </div>
        <div>
          <button
            class="btn btn-outline-primary"
            style="border-radius: 10px !important"
            @click="removeFilter('all')"
          >
            Clear All Filter
          </button>
        </div>
      </div>
      <div class="filter-form">
        <div class="poin-input">
          <div class="h4">Poin Needed</div>
          <div class="d-flex mt-2 mb-1">
            <div class="text-primary h4 mr-auto">
              IDR {{ $formatCurrency(poin.min_poin) }}
            </div>
            <div class="text-primary h4 ml-auto">
              IDR {{ $formatCurrency(poin.max_poin) }}
            </div>
          </div>
          <input
            type="range"
            v-model="filter_payload.poin"
            :min="poin.min_poin"
            :max="poin.max_poin"
            class="w-100"
          />
          <div class="text-center">
            {{ $formatCurrency(filter_payload.poin) }}
          </div>
        </div>
        <div class="awards-type-input mt-5">
          <b-form-group>
            <template #label>
              <b>Awards Type:</b><br />
              <b-form-checkbox
                v-model="allSelected"
                :indeterminate="indeterminate"
                aria-controls="types"
                @change="toggleAll"
              >
                All Type
              </b-form-checkbox>
            </template>

            <template>
              <b-form-checkbox-group
                id="awards-type"
                v-model="filter_payload.type"
                :options="types"
                class="mb-3 mt-0"
                name="awards-type"
                stacked
              ></b-form-checkbox-group>
            </template>
          </b-form-group>
        </div>
        <button class="btn btn-primary w-100 mt-5" @click.prevent="applyFilter">
          Filter
        </button>
      </div>
    </b-modal>
    <b-sidebar id="sidebar-backdrop" backdrop-variant="dark" backdrop shadow>
      <div class="px-3 py-2">
        <img src="/awards_logo.png" alt="" width="130px" height="130px" />
        <h3 style="font-weight: bold">Awards Menu</h3>
        <div class="mt-5">
          <a
            href="#"
            style="font-weight: bold"
            class="d-block mb-3 text-decoration-none text-dark"
            @click.prevent="$router.push('/').catch((err) => {})"
            >Home</a
          >
          <a
            href="#"
            style="font-weight: bold"
            class="d-block mb-3 text-decoration-none text-secondary"
            >Cards</a
          >
          <a
            href="#"
            style="font-weight: bold"
            class="d-block mb-3 text-decoration-none text-secondary"
            >Profile</a
          >
          <a
            href="#"
            @click.prevent="logout"
            style="font-weight: bold"
            class="d-block mb-3 text-decoration-none text-secondary"
            >Logout</a
          >
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import Awards from "./components/Awards.vue";
import qs from "query-string";
export default {
  name: "DashboardComponent",
  components: {
    Awards,
  },
  watch: {
    "filter_payload.type": function (newValue) {
      if (newValue.length === 0) {
        this.indeterminate = false;
        this.allSelected = false;
      } else if (newValue.length === this.types.length) {
        this.indeterminate = false;
        this.allSelected = true;
      } else {
        this.indeterminate = true;
        this.allSelected = false;
      }
    },
  },
  computed: {
    poin() {
      const data = this.$store.getters["awards/poin"];
      return data;
    },
    awards() {
      const data = this.$store.getters["awards/awards"];
      return data || [];
    },
    nextPageLoaded() {
      const data = this.$store.getters["awards/nextPageLoaded"];
      return data || false;
    },
  },
  data() {
    return {
      current_filter: {
        poin: 0,
        type: [],
      },
      filter_payload: {
        poin: 0,
        type: [],
        page: 1,
        limit: 4,
      },
      types: ["Vouchers", "Products", "Others"],
      selected: [],
      allSelected: false,
      indeterminate: false,
    };
  },
  mounted() {
    this.getAwards();
    window.onscroll = () => {
      const round = Math.ceil(window.scrollY + window.innerHeight);
      if (round >= document.body.scrollHeight && !this.nextPageLoaded) {
        this.$store.commit("awards/SET_NEXT_PAGE_LOAD", true);
        this.filter_payload.page += 1;
        this.getAwards();
      }
    };
  },
  methods: {
    async getAwards() {
      try {
        const params = qs.stringify(this.filter_payload);
        await this.$store.dispatch("awards/GET_AWARDS", params);

        this.current_filter.poin = this.filter_payload.poin;
        this.current_filter.type = this.filter_payload.type;
      } catch (err) {
        console.log(err);
      }
    },
    toggleAll(checked) {
      this.filter_payload.type = checked ? this.types.slice() : [];
    },
    applyFilter() {
      this.current_filter.poin = this.filter_payload.poin;
      this.current_filter.type = this.filter_payload.type;
      this.filter_payload.page = 1;
      this.$store.commit("awards/CLEAR_AWARDS");
      this.$store.commit("awards/SET_NEXT_PAGE_LOAD", false);
      this.getAwards();
    },
    removeFilter(state) {
      if (state === "all") {
        this.allSelected = false;
        this.current_filter = {
          poin: 0,
          type: [],
        };
        this.filter_payload.poin = this.poin.min_poin;
        this.filter_payload.type = [];
      } else if (state === "poin") {
        this.current_filter.poin = 0;
        this.filter_payload.poin = 0;
      } else if (state === "type") {
        this.current_filter.type = [];
        this.filter_payload.type = [];
        this.allSelected = false;
      }
    },
    logout() {
      this.$store.commit("auth/RESET_AUTH");
      this.$router.push("/auth");
    },
  },
};
</script>

<style>
.navbar-awards {
  max-width: 50rem !important;
}

.filter-item {
  display: inline-block;
  border: 1px solid #007bff;
  border-radius: 10px;
  color: #007bff;
  padding: 5px;
  margin-bottom: 10px;
}
</style>
