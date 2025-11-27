
import os

file_path = r'F:\project\TICI01680008\backend\app.py'

with open(file_path, 'r') as f:
    content = f.read()

# Replace all occurrences
new_content = content.replace('user_id = get_jwt_identity()', 'user_id = int(get_jwt_identity())')

with open(file_path, 'w') as f:
    f.write(new_content)

print("Successfully updated app.py")
