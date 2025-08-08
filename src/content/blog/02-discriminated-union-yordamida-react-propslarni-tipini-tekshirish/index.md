---
title: "Discriminated Union yordamida React props'larni tipini tekshirish"
description: "React komponentida props ni tiplari bilan ishalshda aqiliroq yo'lni tutish kerak va bu post shu haqida"
date: "2025-08-06"
draft: false
tags:
  - React
  - Typescript
  - Advanced Props
---

## Odatda nima yo'l tutamiz

React'da komponent yasashda hatoliklarga ko'zim tushib qoladi, aynan <i>props type</i> bilan bo'lgan muamolar, quyidagi kodda odatiy kodni ko'rishingiz mumkun. Bu xolatda <i>Typescript</i> o'z mazmunini yo'qotadi.

```tsx
import React from "react";

type ButtonProps = {
  variant: "primary" | "icon";
  icon?: React.ReactNode;
};

export const Button = (props: ButtonProps) => {
  if (props.variant === "primary") {
    return <button class="px-4 py-2">Button</button>;
  } else {
    return <button class="square">{icon}</button>;
  }
};
```

## Keling buni to'g'irlaymiz

Biz har bitta turi uchun o'z props <i>type</i> ni yaratamiz, asosiysi <i>variant field</i> hamma turlarida bo'lishi shart.

```tsx
import React, { ReactNode } from "react";

type PrimaryProps = {
  variant: "primary";
};

type IconProps = {
  variant: "icon";
  icon: ReactNode;
};

type ButtonProps = PrimaryProps | IconProps;

export const Button = (props: ButtonProps) => {
  if (props.variant === "primary") {
    return <button class="px-4 py-2">Button</button>;
  } else {
    return <button class="square">{icon}</button>;
  }
};
```

Endi ushbu komponent aqilliroq va <i>Typescript</i> o'z mazmunini topdi.

## Destrukturizatsiya qilishda hatolik beryapti !

Kelgin destrukturizatsiya holatini ko'rib chiqamiz. Quyidagi o'zgarishdan kegin destrukturizatsiya qilingan qatorda hatolik beradi, sababi <i>icon</i> qaysi holatda kelish yoki kelmasligini <i>Typescript</i> bilmaydi.

```diff lang="tsx" {14}
import React, { ReactNode } from "react";

type PrimaryProps = {
  variant: "primary";
};

type IconProps = {
  variant: "icon";
  icon: ReactNode;
};

type ButtonProps = PrimaryProps | IconProps;

- export const Button = (props: ButtonProps) => {
+ export const Button = ({variant, icon}: ButtonProps) => {
  if (variant === "primary") {
    return <button className="px-4 py-2">Button</button>;
  } else {
    return <button className="square">{icon}</button>;
  }
};
```

Keling, bu holatni hal qilishga harakat qilib ko'ramiz, <i>icon</i> ni o'zini yozmaymizda, uni <i>rest parameter</i> ichida olamiz. Bu holatdayam <i>rest.icon</i> yozilgan joydan hatolik beradi.

```diff lang="tsx"
import React, { ReactNode } from "react";

type PrimaryProps = {
  variant: "primary";
};

type IconProps = {
  variant: "icon";
  icon: ReactNode;
};

type ButtonProps = PrimaryProps | IconProps;

- export const Button = ({variant, icon}: ButtonProps) => {
+ export const Button = ({variant, ...rest}: ButtonProps) => {
  if (variant === "primary") {
    return <button className="px-4 py-2">Button</button>;
  } else {
+    return <button className="square">{rest.icon}</button>;
  }
};
```

## Destrukturizatsiya qilish uchun yechim

Destrukturizatsiya qilishda quyidagi usuldan foydalanish mumkun. Agar boshqa yo'llarini bilsangiz izohda qoldiring, juda foydali bo'lar edi.

```diff lang="tsx"
import React, { ReactNode } from 'react';

type PrimaryProps = {
  variant: 'primary';
};

type IconProps = {
  variant: 'icon';
  icon: ReactNode;
};

type ButtonProps = PrimaryProps | IconProps;

export const Button = ({ variant, ...rest }: ButtonProps) => {
  if (variant === 'primary') {
    return <button className='px-4 py-2'>Button</button>;
-  } else {
+  } else if ('icon' in rest) {
    return <button className='square'>{rest.icon}</button>;
  }
};
```

Tabriklayman sizda engi aqilli react komponent bor quyida to'liq kodi keltirilgan

```tsx
import React, { ReactNode } from "react";

type PrimaryProps = {
  variant: "primary";
};

type IconProps = {
  variant: "icon";
  icon: ReactNode;
};

type ButtonProps = PrimaryProps | IconProps;

export const Button = ({ variant, ...rest }: ButtonProps) => {
  if (variant === "primary") {
    return <button className="px-4 py-2">Button</button>;
  } else if ("icon" in rest) {
    return <button className="square">{rest.icon}</button>;
  }
};
```

Savolingiz yoki biror bir fikringiz bo'lsa izohda yozib qoldiring.
