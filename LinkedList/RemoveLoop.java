public class RemoveLoop {
  public static class Node {
    int data;
    Node next;

    public Node(int data) {
      this.data = data;
      this.next = null;
    }
  }

  public static Node head;

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

  public static void removeLoop() {
    if (detectLoop()) {
      Node slow = head;
      Node fast = head;
      while (fast != null && fast.next != null) {
        fast = fast.next.next;
        slow = slow.next;
        if (slow == fast) {
          break;
        }
      }
      slow = head;
      Node prev = fast;
      while (slow != fast) {
        slow = slow.next;
        prev = fast;
        fast = fast.next;
      }
      prev.next = null;
    }
  }

  public void print() {
    Node temp = head;
    while (temp != null) {
      System.out.print(temp.data + "->");
      temp = temp.next;
    }
    System.out.println("null");
  }

  public static void main(String[] args) {
    head = new Node(1);
    head.next = new Node(2);
    head.next.next = new Node(3);
    head.next.next.next = head;
    System.out.println(detectLoop());
    removeLoop();
    System.out.println(detectLoop());
  }
}
