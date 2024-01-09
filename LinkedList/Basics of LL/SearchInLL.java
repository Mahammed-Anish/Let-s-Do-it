public class SearchInLL {
  public static class Node {
    int data;
    Node next;

    public Node(int data) {
      this.data = data;
      this.next = null;
    }

  }

  public static Node head;

  // search iterative
  public int search(int data) {
    Node temp = head;
    int i = 0;
    while (temp != null) {
      if (temp.data == data) {
        return i;
      }
      temp = temp.next;
      i++;
    }
    return -1;
  }

  // search recursive
  public int helper(int data, Node temp) {
    if (temp == null) {
      return -1;
    } else if (temp.data == data) {
      return 0;
    }
    int idx = helper(data, temp.next);
    if (idx == -1)
      return -1;
    return 1 + idx;
  }

  public int recSearch(int data) {
    Node temp = head;
    // return helper(data, temp, 0);
    return helper(data, temp);
  }

  public static void main(String[] args) {
    SearchInLL ll = new SearchInLL();
    head = new Node(1);
    head.next = new Node(2);
    head.next.next = new Node(3);
    // System.out.println(ll.search(4));
    System.out.println(ll.recSearch(1));

  }
}
