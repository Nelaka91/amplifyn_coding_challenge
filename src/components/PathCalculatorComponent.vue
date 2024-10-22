<template>
  <div class="wrapper">
    <div class="section">
      <div class="header">
        <h1 class="text-semibold">Dijkstra's Algorithm Calculator</h1>
        <h5>
          Discovering Optimal Routes Through Nodes Using Dijkstra's Method
        </h5>
      </div>
      <div class="card">
        <div class="form">
          <h2 class="text-semibold">Select Path</h2>
          <label>
            From Node
            <custom-select
              ref="fromNodeSelect"
              :data="nodes"
              v-model="fromNode"
            />
          </label>
          <label>
            To Node
            <custom-select ref="toNodeSelect" :data="nodes" v-model="toNode" />
          </label>
          <div class="buttons-wrapper">
            <custom-button
              label="Clear"
              :style="'outline'"
              @click="clearResults"
            />
            <custom-button label="Calculate" @click="calculatePath">
              <icon-calculator />
            </custom-button>
          </div>
        </div>
        <div :class="['preview', isResult ? 'result' : 'figure']">
          <figure-person v-if="!isResult" />
          <result-component
            v-else
            :from-node="fromNode"
            :to-node="toNode"
            :path="result?.path"
            :distance="result?.distance"
          />
        </div>
      </div>
    </div>
    <div class="section"></div>
  </div>
</template>

<script setup lang="ts">
import CustomSelect from './common/SelectComponent.vue'
import CustomButton from './common/ButtonComponent.vue'
import FigurePerson from './images/FigurePerson.vue'
import ResultComponent from './ResultComponent.vue'
import IconCalculator from './icons/IconCalculator.vue'
import { ref } from 'vue'
import {
  calculateShortestPath,
  getNodeIdsForDropdown,
  mockNodes,
} from '@/services/mockService'

const isResult = ref(false)
const fromNode = ref<string>('')
const toNode = ref<string>('')
const nodes = ref<Array<string>>(getNodeIdsForDropdown())
const result = ref<{ path: string[]; distance: number } | null>(null)

const fromNodeSelect = ref<InstanceType<typeof CustomSelect>>()
const toNodeSelect = ref<InstanceType<typeof CustomSelect>>()

/**
 * Triggers the calculation of the shortest path between two selected nodes.
 * Updates the result to show the calculated path and distance.
 * Sets the result view to be visible.
 */
const calculatePath = () => {
  if (fromNode.value && toNode.value) {
    isResult.value = true
    result.value = calculateShortestPath(
      fromNode.value,
      toNode.value,
      mockNodes,
    )
  }
}

/**
 * Resets the form and hides the result view.
 * @function
 */
const clearResults = () => {
  fromNode.value = ''
  toNode.value = ''
  result.value = null
  isResult.value = false
}
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .section {
    flex: 1;
    &:nth-child(1) {
      background-color: hsla(213, 81%, 35%, 1);
      position: relative;
      padding-top: 80px;
      .header {
        text-align: center;
        color: hsla(0, 0%, 100%, 1);
        h1 {
          font-size: 36px;
          line-height: 48px;
          margin-bottom: 16px;
        }
        h5 {
          font-size: 18px;
          line-height: 24px;
        }
      }
      .card {
        max-width: 720px;
        min-height: 300px;
        display: flex;
        border-radius: 8px;
        box-shadow: 0px 8px 22px 2px hsla(0, 0%, 0%, 0.12);

        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom: -150px;
        .form,
        .preview {
          flex: 1;
          padding: 32px;
        }
        .form {
          background-color: hsla(0, 0%, 100%, 1);
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          h2 {
            font-size: 20px;
            line-height: 28px;
            margin-bottom: 24px;
            color: hsla(213, 81%, 35%, 1);
          }
          .buttons-wrapper {
            display: flex;
            flex-direction: row;
          }
        }
        .preview {
          display: flex;
          flex-direction: column;
          background-color: hsla(225, 18%, 96%, 1);
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
        .figure {
          background-color: hsla(0, 0%, 100%, 1);
          align-items: center;
          justify-content: center;
        }
        .result {
          align-items: start;
        }
      }
    }
    &:nth-child(2) {
      background-color: hsla(211, 100%, 95%, 1);
    }
  }
}

@media only screen and (max-width: 800px) {
  .wrapper {
    .section {
      &:nth-child(1) {
        padding-top: 0;
        .header {
          margin: 16px;
        }
        .card {
          flex-direction: column;
          position: initial;
          margin: 16px;
          .preview {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
          }
          .form {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        }
      }
    }
  }
}
</style>
