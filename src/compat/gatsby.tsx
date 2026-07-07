import React from 'react';
import { getStaticQueryResult } from '../data/content';

export type GatsbyLinkProps<TState = unknown> = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    to: string;
    state?: TState;
    ref?: React.Ref<HTMLAnchorElement>;
};

export const Link = React.forwardRef<HTMLAnchorElement, GatsbyLinkProps>(
    ({ to, state: _state, children, ...props }, ref) => (
        <a ref={ref} href={to} {...props}>
            {children}
        </a>
    ),
);

Link.displayName = 'Link';

export function graphql(strings: TemplateStringsArray | string, ...values: unknown[]): string {
    if (typeof strings === 'string') return strings;
    return strings.reduce((result, part, index) => `${result}${part}${values[index] ?? ''}`, '');
}

export function useStaticQuery(query: string): any {
    return getStaticQueryResult(query);
}

export function Script(props: React.ScriptHTMLAttributes<HTMLScriptElement>): React.ReactElement {
    return <script {...props} />;
}
