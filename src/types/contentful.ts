import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSupportFields {
  title: EntryFieldTypes.Symbol;
  category: EntryFieldTypes.Symbol<"MCborn" | "VCLinux" | "VCMi">;
  date_created: EntryFieldTypes.Date;
  date_updated?: EntryFieldTypes.Date;
  content: EntryFieldTypes.RichText;
}

export type TypeSupportSkeleton = EntrySkeletonType<TypeSupportFields, "support">;
export type TypeSupport<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeSupportSkeleton, Modifiers, Locales>;
