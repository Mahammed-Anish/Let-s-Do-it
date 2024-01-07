package LinkedList;

/**
 * InnerLinkedList
 */
public class LinkedList {
  static class Node {
    int data;
    Node next;

    Node(int data) {
      this.data = data;
      this.next = null;
    }
  }

  public static Node head;
  public static Node tail;

  public void addFirst(int data) {
    Node newNode = new Node(data);
    if (head == null) {
      head = tail = newNode;
      return;
    }
    newNode.next = head;
    head = newNode;
    return;
  }

  public static void main(String[] args) {
    System.out.println("Mahammed Anish");
    LinkedList ll = new LinkedList();
    ll.addFirst(10);
  }
}