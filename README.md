# flatmarkdown-ast

TypeScript type definitions for the [FlatMarkdown](https://github.com/petajournal/flatmarkdown) AST.

The npm package is named `flatmarkdown-ast`. The repository is named `flatmarkdown-ast-ts`, because the Rust crate [flatmarkdown-ast](https://crates.io/crates/flatmarkdown-ast) with the same types lives in the [flatmarkdown](https://github.com/petajournal/flatmarkdown) repository.

## Installation

```bash
npm install flatmarkdown-ast
```

## Usage

```typescript
import type { AstNode, DocumentNode, Page } from 'flatmarkdown-ast';

const doc: DocumentNode = {
  type: 'document',
  children: [
    { type: 'heading', level: 1, children: [{ type: 'text', value: 'Hello' }] },
  ],
};

// The JSON that parse_page returns
const page: Page = JSON.parse(json);
```

## Versions

The types follow [SPEC_AST.md](https://github.com/petajournal/flatmarkdown/blob/main/SPEC_AST.md) of the flatmarkdown repository.
They hold what the specification defines, and nothing more.

The version is the same as the version of the Rust crates.
`flatmarkdown-ast` x.y.z on npm describes the AST that the `flatmarkdown` crate x.y.z makes.

## Exported Types

All 37 AST node interfaces and the `AstNode` union type:

**Block nodes (17):** `DocumentNode`, `ParagraphNode`, `HeadingNode`, `CodeBlockNode`, `BlockQuoteNode`, `MultilineBlockQuoteNode`, `ListNode`, `ItemNode`, `TaskItemNode`, `TableNode`, `TableRowNode`, `TableCellNode`, `ThematicBreakNode`, `HtmlBlockNode`, `FootnoteDefinitionNode`, `AlertNode`, `SubtextNode`

**Inline nodes (20):** `TextNode`, `SoftbreakNode`, `LinebreakNode`, `EmphNode`, `StrongNode`, `StrikethroughNode`, `UnderlineNode`, `HighlightNode`, `SuperscriptNode`, `SubscriptNode`, `SpoileredTextNode`, `CodeNode`, `LinkNode`, `EmbedNode`, `WikilinkNode`, `FootnoteReferenceNode`, `ShortcodeNode`, `MathNode`, `HtmlInlineNode`, `HashtagNode`

**Page:** `Page` and `PageItem`, the result of `parse_page`

**Attribute values:** `ListType`, `TableAlignment`

## Changes in 0.5.0

0.5.0 follows the AST of flatmarkdown 0.5.0. It is a breaking change from 0.2.0.

- `ImageNode` is now `EmbedNode` (`type: 'embed'`), with `props`.
- `ItemNode` has no `tight`. Read `tight` of the parent `ListNode`.
- `MathNode` has no `dollar_math` and no `display_math`. Math is always inline.
- `HeadingNode` has no `setext`.
- The nodes that the parser never makes are removed: `FrontMatterNode`, `RawNode`, `EscapedNode`, `EscapedTagNode`, `HeexBlockNode`, `HeexInlineNode`, and the four description list nodes.
- `Page` and `PageItem` are new.

## License

MIT
