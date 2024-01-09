public class LinkedList {
  public static class Node {
    int data;
    Node next;

    public Node(int data) {
      this.data = data;
      this.next = null;
    }

  }

  public static Node head;
  public static Node tail;
  public static int size;

  public void addFirst(int data) {
    Node newNode = new Node(data);
    size++;

    if (head == null) {
      head = tail = newNode;
      return;
    }

    newNode.next = head;
    head = newNode;
  }

  public void addLast(int data) {
    Node newNode = new Node(data);
    size++;

    if (head == null) {
      head = tail = newNode;
      return;
    }

    tail.next = newNode;
    tail = newNode;
  }

  // add in the middle
  // search iterative
  // search recursive
  // reverse linkedlist
  // find & remove nth node from end
  // check if ll is palindrome

  public int removeFirst() {
    if (head == null) {
      System.out.println("LinkedList is Empty");
      return Integer.MIN_VALUE;
    } else if (head.next == null) {
      int val = head.data;
      head = tail = null;
      size = 0;
      return val;
    }

    size--;
    int val = head.data;
    head = head.next;
    return val;
  }

  public int removeLast() {
    if (head == null) {
      System.out.println("LinkedList is Empty");
      return Integer.MIN_VALUE;
    } else if (head.next == null) {
      int val = head.data;
      head = tail = null;
      size = 0;
      return val;
    }

    size--;
    Node temp = head;
    Node prev = null;
    while (temp.next != null) {
      prev = temp;
      temp = temp.next;
    }

    int val = prev.data;
    prev.next = null;
    tail = prev;
    return val;
  }

  public void print() {
    if (head == null) {
      System.out.println("LinkedList is Empty");
      return;
    }

    Node temp = head;
    while (temp != null) {
      System.out.print(temp.data + "->");
      temp = temp.next;
    }
    System.out.println("null");
  }

  public static void main(String[] args) {
    LinkedList ll = new LinkedList();
    ll.addFirst(3);
    ll.addFirst(2);
    ll.addFirst(1);
    ll.print();
    System.out.println(ll.size);
    ll.addLast(4);
    ll.addLast(5);
    ll.print();
    System.out.println(ll.size);
    ll.removeFirst();
    ll.print();
    System.out.println(ll.size);
    ll.removeLast();
    ll.print();
    System.out.println(ll.size);
  }
}
