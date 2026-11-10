# flatmarkdown-ast

TypeScript type definitions for the [FlatMarkdown](https://github.com/petajournal/flatmarkdown) AST.

The npm package is named `flatmarkdown-ast`. The repository is named `flatmarkdown-ast-ts`, because the Rust crate [flatmarkdown-ast](https://crates.io/crates/flatmarkdown-ast) with the same types lives in the [flatmarkdown](https://github.com/petajournal/flatmarkdown) repository.

## Installation

```bash
npm install flatmarkdown-ast
```

## Usage

```typescript
import type { AstNode, DocumentNode, HeadingNode } from 'flatmarkdown-ast';

const doc: DocumentNode = {
  type: 'document',
  children: [
    { type: 'heading', level: 1, setext: false, children: [{ type: 'text', value: 'Hello' }] },
  ],
};
```

## Exported Types

All 46 AST node interfaces and the `AstNode` union type:

**Block nodes:** `DocumentNode`, `ParagraphNode`, `HeadingNode`, `CodeBlockNode`, `BlockQuoteNode`, `MultilineBlockQuoteNode`, `ListNode`, `ItemNode`, `TaskItemNode`, `TableNode`, `TableRowNode`, `TableCellNode`, `ThematicBreakNode`, `HtmlBlockNode`, `FootnoteDefinitionNode`, `DescriptionListNode`, `DescriptionItemNode`, `DescriptionTermNode`, `DescriptionDetailsNode`, `AlertNode`, `FrontMatterNode`, `HeexBlockNode`, `SubtextNode`

**Inline nodes:** `TextNode`, `SoftbreakNode`, `LinebreakNode`, `EmphNode`, `StrongNode`, `StrikethroughNode`, `UnderlineNode`, `HighlightNode`, `SuperscriptNode`, `SubscriptNode`, `SpoileredTextNode`, `CodeNode`, `LinkNode`, `ImageNode`, `FootnoteReferenceNode`, `ShortcodeNode`, `MathNode`, `HtmlInlineNode`, `HeexInlineNode`, `RawNode`, `EscapedNode`, `EscapedTagNode`, `WikilinkNode`, `HashtagNode`

## License

MIT
