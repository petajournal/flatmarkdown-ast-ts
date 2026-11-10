// The types follow SPEC_AST.md of the flatmarkdown repository:
// https://github.com/petajournal/flatmarkdown/blob/main/SPEC_AST.md
// They hold what the specification defines, and nothing more.

// ── Block Nodes ──

export interface DocumentNode {
  type: 'document';
  children?: AstNode[];
}

export interface ParagraphNode {
  type: 'paragraph';
  children?: AstNode[];
}

export interface HeadingNode {
  type: 'heading';
  /** Heading level, 1–6 */
  level: number;
  children?: AstNode[];
}

export interface CodeBlockNode {
  type: 'code_block';
  /**
   * `true` if written with fences, `false` if written with an indent.
   * An AST written before this attribute existed has no `fenced`; read it as `true`.
   */
  fenced?: boolean;
  /** Info string after the opening fence. `"text"` when a fenced block has none. */
  info: string;
  literal: string;
}

export interface BlockQuoteNode {
  type: 'block_quote';
  children?: AstNode[];
}

export interface MultilineBlockQuoteNode {
  type: 'multiline_block_quote';
  children?: AstNode[];
}

export type ListType = 'bullet' | 'ordered';

export interface ListNode {
  type: 'list';
  list_type: ListType;
  start: number;
  /** Tight or loose is a property of the whole list. An item has no `tight`. */
  tight: boolean;
  delimiter: 'period' | 'paren';
  children?: AstNode[];
}

export interface ItemNode {
  type: 'item';
  list_type: ListType;
  start: number;
  children?: AstNode[];
}

export interface TaskItemNode {
  type: 'task_item';
  /** The character in the brackets, or `null` if unchecked */
  symbol: string | null;
  children?: AstNode[];
}

export type TableAlignment = 'none' | 'left' | 'center' | 'right';

export interface TableNode {
  type: 'table';
  alignments: TableAlignment[];
  num_columns: number;
  num_rows: number;
  children?: AstNode[];
}

export interface TableRowNode {
  type: 'table_row';
  header: boolean;
  children?: AstNode[];
}

export interface TableCellNode {
  type: 'table_cell';
  children?: AstNode[];
}

export interface ThematicBreakNode {
  type: 'thematic_break';
}

export interface HtmlBlockNode {
  type: 'html_block';
  /** HTML block type, 1–7 */
  block_type: number;
  literal: string;
}

export interface FootnoteDefinitionNode {
  type: 'footnote_definition';
  /** Footnote label. `__inline_N` for an inline footnote (`^[content]`). */
  name: string;
  children?: AstNode[];
}

export interface AlertNode {
  type: 'alert';
  alert_type: 'note' | 'tip' | 'important' | 'warning' | 'caution';
  /** Custom title, or `null` for the default */
  title: string | null;
  children?: AstNode[];
}

export interface SubtextNode {
  type: 'subtext';
  children?: AstNode[];
}

// ── Inline Nodes ──

export interface TextNode {
  type: 'text';
  value: string;
}

export interface SoftbreakNode {
  type: 'softbreak';
}

export interface LinebreakNode {
  type: 'linebreak';
}

export interface EmphNode {
  type: 'emph';
  children?: AstNode[];
}

export interface StrongNode {
  type: 'strong';
  children?: AstNode[];
}

export interface StrikethroughNode {
  type: 'strikethrough';
  children?: AstNode[];
}

export interface UnderlineNode {
  type: 'underline';
  children?: AstNode[];
}

export interface HighlightNode {
  type: 'highlight';
  children?: AstNode[];
}

export interface SuperscriptNode {
  type: 'superscript';
  children?: AstNode[];
}

export interface SubscriptNode {
  type: 'subscript';
  children?: AstNode[];
}

export interface SpoileredTextNode {
  type: 'spoilered_text';
  children?: AstNode[];
}

export interface CodeNode {
  type: 'code';
  literal: string;
}

export interface LinkNode {
  type: 'link';
  url: string;
  title: string;
  /** The link text */
  children?: AstNode[];
}

/** All Markdown image syntax (`![alt](url)`) is a media embed: image, video, audio, PDF. */
export interface EmbedNode {
  type: 'embed';
  /** Media source URL, without the `#` fragment */
  url: string;
  title: string;
  /**
   * Properties parsed from the URL fragment (`#key=value&flag`).
   * A flag without `=` is `true`. Omitted when there are no properties.
   */
  props?: Record<string, string | true>;
  /** The alt text */
  children?: AstNode[];
}

export interface WikilinkNode {
  type: 'wikilink';
  /** Link destination. May contain a `#id` fragment for a link to an item. */
  url: string;
  /** The label. Without a label, the URL as a text node. */
  children?: AstNode[];
}

export interface FootnoteReferenceNode {
  type: 'footnote_reference';
  /** Footnote label. `__inline_N` for an inline footnote (`^[content]`). */
  name: string;
  /** Index of this reference to the same footnote */
  ref_num: number;
  /** Index of the footnote in the body. It starts at 1 and restarts in every body. */
  ix: number;
}

export interface ShortcodeNode {
  type: 'shortcode';
  code: string;
  emoji: string;
}

/** Inline math. There is no display math. */
export interface MathNode {
  type: 'math';
  literal: string;
}

export interface HtmlInlineNode {
  type: 'html_inline';
  value: string;
}

export interface HashtagNode {
  type: 'hashtag';
  /** Tag name without the leading `#` */
  value: string;
}

// ── Union Type ──

export type AstNode =
  // Block
  | DocumentNode
  | ParagraphNode
  | HeadingNode
  | CodeBlockNode
  | BlockQuoteNode
  | MultilineBlockQuoteNode
  | ListNode
  | ItemNode
  | TaskItemNode
  | TableNode
  | TableRowNode
  | TableCellNode
  | ThematicBreakNode
  | HtmlBlockNode
  | FootnoteDefinitionNode
  | AlertNode
  | SubtextNode
  // Inline
  | TextNode
  | SoftbreakNode
  | LinebreakNode
  | EmphNode
  | StrongNode
  | StrikethroughNode
  | UnderlineNode
  | HighlightNode
  | SuperscriptNode
  | SubscriptNode
  | SpoileredTextNode
  | CodeNode
  | LinkNode
  | EmbedNode
  | WikilinkNode
  | FootnoteReferenceNode
  | ShortcodeNode
  | MathNode
  | HtmlInlineNode
  | HashtagNode;

// ── Page ──

/** One outline item of a page */
export interface PageItem {
  /** Indent level. `1` is the shallowest level. */
  level: number;
  /** The HMTID from the metadata line, or `null` */
  id: string | null;
  /** `key: value` pairs from the metadata line. Values are always strings. */
  properties: Record<string, string>;
  /** The Markdown source of the item */
  body: string;
  /** The result of parsing `body` */
  ast: DocumentNode;
}

/** The result of `page_to_ast` */
export interface Page {
  type: 'page';
  /** The raw YAML front matter, including the `---` delimiters, or `null` */
  front_matter: string | null;
  items: PageItem[];
}
