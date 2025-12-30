import os
import subprocess

def run_git():
    path = os.getcwd()
    with open("python_diag.txt", "w") as f:
        f.write(f"Current Path: {path}\n")
        f.write("Files in root: " + str(os.listdir(".")) + "\n")
        
        try:
            # Git Remote
            res = subprocess.run(["git", "remote", "-v"], capture_output=True, text=True)
            f.write("\n--- REMOTE ---\n" + res.stdout + res.stderr)
            
            # Git Log
            res = subprocess.run(["git", "log", "-n", "5", "--oneline"], capture_output=True, text=True)
            f.write("\n--- LOG ---\n" + res.stdout + res.stderr)
            
            # Git Status
            res = subprocess.run(["git", "status"], capture_output=True, text=True)
            f.write("\n--- STATUS ---\n" + res.stdout + res.stderr)
            
        except Exception as e:
            f.write(f"\nError running git: {str(e)}")

if __name__ == "__main__":
    run_git()


