---
title:Button|hc-ui
description:Button 组件的文档
---

# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type`、`plain`、`round`和`circle` 来定义按钮的样式。

<preview path="../demo/Button/Basic.vue" title="基础用法" description="Button组件的基础用法"></preview>

## 禁用状态

可以使用 disabled 属性来定义按钮是否被禁用。
<preview path="../demo/Button/disabled.vue" title="禁用状态" description="你可以使用 disabled 属性来定义按钮是否被禁用。"></preview>

## 图标按钮

可以使用 disabled 属性来定义按钮是否被禁用。
<preview path="../demo/Button/Icon.vue" title="图标按钮" description="你使用 icon 属性来为按钮添加图标。"></preview>

## 加载状态按钮

通过设置 loading 属性为 true 来显示加载中状态。
<preview path="../demo/Button/loading.vue" title="加载状态" description="通过设置 loading 属性为 true 来显示加载中状态。"></preview>

## 按钮大小

通过设置 size 属性来设置按钮大小，也可以通过width、height属性自定义大小
<preview path="../demo/Button/size.vue" title="按钮大小" description="通过设置 loading 属性为 true 来显示加载中状态。"></preview>

### Button Attributes

| 属性名      | 描述                | 类型                                                             | 默认值 |
| ----------- | ------------------- | ---------------------------------------------------------------- | ------ |
| size        | 尺寸                | `enum` - `'large'\| 'small'`                                     | —      |
| type        | 类型                | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | —      |
| plain       | 是否为朴素按钮      | `boolean`                                                        | false  |
| round       | 是否为圆角按钮      | `boolean`                                                        | false  |
| circle      | 是否为圆形按钮      | `boolean`                                                        | false  |
| loading     | 是否为加载中状态    | `boolean`                                                        | false  |
| disabled    | 按钮是否为禁用状态  | `boolean`                                                        | false  |
| icon        | 图标                | `string` ``                                                        | —      |
| autofocus   | 原生 autofocus 属性 | `boolean`                                                        | false  |
| native-type | 原生 type 属性      | `enum` - `'button'\| 'submit'\| 'reset'`                         | button |
| width       | 按钮宽度            | `string`                                                         | —      |
| height      | 按钮高度            | `string`                                                         | —      |
