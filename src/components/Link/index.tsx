import React from 'react';
import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby';
import { getExternalLinkRel } from '../../utils/linkUtils';
import { isExternalURL } from '../../utils/isExternalURL';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Link({ to, children, ref, ...rest }: GatsbyLinkProps<undefined>): React.ReactElement {
    if (!isExternalURL(to) && rest.target !== '_blank') {
        return (
            <GatsbyLink to={to} {...rest}>
                {children}
            </GatsbyLink>
        );
    } else {
        return (
            <a {...rest} href={to} rel={getExternalLinkRel(to)}>
                {children}
            </a>
        );
    }
}
