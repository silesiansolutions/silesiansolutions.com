import React from 'react';
import { getExternalLinkRel } from '../../utils/linkUtils';
import { isExternalURL } from '../../utils/isExternalURL';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string;
}

export function Link({ to, children, ...rest }: LinkProps): React.ReactElement {
    if (!isExternalURL(to) && rest.target !== '_blank') {
        return (
            <a href={to} {...rest}>
                {children}
            </a>
        );
    }

    return (
        <a {...rest} href={to} rel={getExternalLinkRel(to)}>
            {children}
        </a>
    );
}
