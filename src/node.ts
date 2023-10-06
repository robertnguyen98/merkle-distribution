import { getBytes, hexlify, keccak256, zeroPadValue } from 'ethers'

import { xor } from './utils'

/**
 * The node in tree.
 * Different from leafs, nodes are generated by its children.
 * Node = Hash(Child1, Child2)
 */
export class Node {
  /**
   * Node constructor
   * @param value The hash value of Hash(Child1, Child2)
   */
  constructor(public readonly value: Uint8Array) {}

  /**
   * Hash the sibling to the parent value.
   * @returns Parent's hash.
   */
  hash(sibling: Node): Node {
    const value = getBytes(keccak256(xor(this.value, sibling.value)))
    return new Node(value)
  }

  /**
   * Hexlify the value.
   * @returns Hex string.
   */
  toString() {
    return zeroPadValue(hexlify(this.value), 32)
  }

  /**
   * Compare to another node.
   * @param node Node.
   * true/false
   */
  eq(node: Node): boolean {
    return this.toString() === node.toString()
  }
}