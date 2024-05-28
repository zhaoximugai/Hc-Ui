---
title:Collapse|hc-ui
description:Collapse 组件的文档
---

# Collapse 折叠面板

通过折叠面板收纳内容区域

## 基础用法

可同时展开多个面板，面板之间不影响

<preview path="../demo/Collapse/Basic.vue" title="折叠面板" description="Collapse组件的基础用法"></preview>

## 手风琴效果

每次只能展开一个面板,
通过 accordion 属性来设置是否以手风琴模式显示。
<preview path="../demo/Collapse/accordion.vue" title="折叠面板" description="Collapse组件的基础用法"></preview>

## 自定义面板标题

除了可以通过 title 属性以外，还可以通过具名 slot 来实现自定义面板的标题内容
<preview path="../demo/Collapse/sed.vue" title="折叠面板" description="Collapse组件的基础用法"></preview>


### Collapse Attributes

| 属性名      | 描述                | 类型                                                             | 默认值 |
| ----------- | ------------------- | ---------------------------------------------------------------- | ------ |
| modelValue        | 当前活动面板                | `array`                                     | —      |
| accordion        | boolean                | `boolean` | —      |

### CollapseItem Attributes

| 属性名      | 描述                | 类型                                                             | 默认值 |
| ----------- | ------------------- | ---------------------------------------------------------------- | ------ |
| name        | 唯一标志符                | `string/number`                                     | —      |
| title        | 面板标题                | `string` | —      |
| disabled        | 是否禁用                | `boolean` | —      |
