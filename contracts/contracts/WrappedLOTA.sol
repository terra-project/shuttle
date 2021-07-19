// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import './WrappedToken.sol';

contract WrappedLOTA is WrappedToken {
    constructor() public WrappedToken("Wrapped LOTA Token", "LOTA") {}
}
