public class DetectLoop {
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

  public int removeFirst() {
    if (size == 0) {
      return -1;
    } else if (size == 1) {
      int val = head.data;
      head = tail = null;
      return val;
    }
    int val = head.data;
    head = head.next;
    return val;
  }

  public int removeLast() {
    if (size == 0) {
      return -1;
    } else if (size == 1) {
      int val = head.data;
      head = tail = null;
      return val;
    }

    int val = tail.data;
    Node temp = head;
    for (int i = 1; i < size - 1; i++) {
      temp = temp.next;
    }
    temp.next = null;
    return val;
  }

  public void print() {
    Node temp = head;
    while (temp != null) {
      System.out.print(temp.data + "->");
      temp = temp.next;
    }
    System.out.println("null");
  }

  public static boolean detectLoop() {
    Node slow = head;
    Node fast = head;

    while (fast != null && fast.next != null) {
      fast = fast.next.next;
      slow = slow.next;
      if (slow == fast) {
        return true;
      }
    }
    return false;
  }

  public static void main(String[] args) {
    // DetectLoop ll = new DetectLoop();
    // ll.addFirst(3);
    // ll.addFirst(2);
    // ll.addFirst(1);
    // ll.print();
    // ll.addLast(4);
    // ll.addLast(5);
    // ll.print();
    head = new Node(1);
    head.next = new Node(2);
    head.next.next = new Node(3);
    head.next.next.next = head;
    System.out.println(detectLoop());
  }
}
