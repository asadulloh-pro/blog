---
title: '"Generic type" ni react komoponentlarda ishlatish.'
description: "Bu postda typescript (generic type) ni react komponentlarida qanday tog`ri qo`lashni tushuntirib berishga harakat qilaman"
date: "2025-07-10"
draft: false
tags:
  - Typescript
---

## Odatda biz nima yo'l tutamiz

Odatda react komponent yasashda quiyida keltirilgan yo'ldan foydalaniladi va har safar <i>items</i> props dan kelayotgan malumotni <i>type</i> ni qo'lda o'zgartirishga to'g'ri keladi. Quyidagi kodni 17 chi qatorida hatolik beradi, sababi <i>items type</i> ni ichida <i>name</i> degan <i>field</i> yo'q.

```tsx {17}
import React from "react";

interface TableProps {
  items: { id: string }[];
  renderItem: (item: { id: string }) => React.ReactNode;
}

export const Table = (props: TableProps) => {
  return null;
};

export const Component = () => {
  return (
    <Table
      items={[{ id: "1", name: "Alex" }]}
      renderItem={(item) => {
        item.name;
        // typescript hatolik beradi
        return null;
      }}
    ></Table>
  );
};
```

## Keling buni to'g'irlaymiz

Quyida keltirilgan o'zgarishlar orqali <b>Table</b> komponentimizmi dinamik tip oladigan qilib o'zgartiramiz. Yani <i>items</i> ni tipini <i>items props</i> dan keladigan malumotni tipiga qarab oladi.

```diff lang="tsx"
import React from "react";

-interface TableProps {
- items: { id: string }[];
- renderItem: (item: { id: string }) => React.ReactNode;
-}

+interface TableProps<T> {
+  items: T[];
+  renderItem: (item: T) => React.ReactNode;
+}

-export const Table = (props: TableProps) => {

+export const Table = <T,>(props: TableProps<T>) => {
  return null;
};

export const Component = () => {
  return (
    <Table
      items={[{ id: "1", name: "Alex" }]}
      renderItem={(item) => {
        item.name;
        // bu holatda typescript hatolik bermaydi
        return null;
      }}
    ></Table>
  );
};
```

Savolingiz yoki biror bir fikringiz bo'lsa izohda yozib qoldiring.
