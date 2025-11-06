---
title: linux系统的安装与基本操作
published: 2025-09-28
description: ''
image: './lin.jpg'
tags: ['linux']
category: '开发工具(development tools)'
draft: false 
lang: ''
---

# linux 系统的安装

#### 清华镜像源网址

###### 首先下载好想要的linux的对应镜像文件

###### archlinux

https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/2025.10.01/

![image-20251025235800922](C:\Users\86183\AppData\Roaming\Typora\typora-user-images\image-20251025235800922.png)

---

###### ubuntu

[Index of /ubuntu-releases/24.04/ | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/ubuntu-releases/24.04/)、

![image-20251025235729107](C:\Users\86183\AppData\Roaming\Typora\typora-user-images\image-20251025235729107.png)

---

###### 系统的正式装载

对于ubuntu的linux系统，进入bios后选择以U盘启动将自动进行安装，这里我们以archlinux为例子进行安装，可参考：

[安装指南 - Arch Linux 中文维基](https://wiki.archlinuxcn.org/wiki/安装指南)

具体步骤包括：

#### 1.安装前的准备

https://wiki.archlinuxcn.org/wiki/%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97#%E5%AE%89%E8%A3%85%E5%89%8D%E7%9A%84%E5%87%86%E5%A4%87

#### 2.开始安装系统

https://wiki.archlinuxcn.org/wiki/%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97#%E5%BC%80%E5%A7%8B%E5%AE%89%E8%A3%85%E7%B3%BB%E7%BB%9F

#### 3.配置系统

https://wiki.archlinuxcn.org/wiki/%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97#%E9%85%8D%E7%BD%AE%E7%B3%BB%E7%BB%9F

#### 4.重新启动系统

https://wiki.archlinuxcn.org/wiki/%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97#%E9%87%8D%E6%96%B0%E5%90%AF%E5%8A%A8%E8%AE%A1%E7%AE%97%E6%9C%BA

#### 5.安装成功后的配置

---

#### 1.安装前的准备

###### 下载ultraiso制作镜像U盘

[最新UltraISO官方免费下载 - UltraISO软碟通中文官方网站](https://ultraiso.net/xiazai.html)

制作关于Linux系统的uefi启动U盘，具体操作如视频

## Bilibili

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=113265787016244&bvid=BV1EG1yYkEqo&cid=26185369364&p=1" 
        scrolling="no" 
        border="0" 
        frameborder="no" 
        framespacing="0" 
        width="100%" 
        height="500px"
        allowfullscreen="true">
</iframe>
###### u盘系统的接入

插入u盘，进入bios，选择u盘启动，即可进入U盘中的Linux系统。

---

###### 连接到互联网

##### 连接WiFi输入

按tab可以自动生成未输入完成的内容

```js title="line-markers.js" del={2} ins={3-4} {6}
iwct
```

获取wifi列表

```js title="line-markers.js" del={2} ins={3-4} {6}
station wlan0 get network
```

连接wifi

```js title="line-markers.js" del={2} ins={3-4} {6}
station wlan0 connect ‘wifi名称’
```

测试网络

```js title="line-markers.js" del={2} ins={3-4} {6}
ping www.baidu.com
```

可以选择archinstall进行图形化页面安装，推荐手动进行安装

###### **创建硬盘分区**

查看硬盘分区选择要安装系统的磁盘

```
# fdisk -l	#此处为小写字母l
```

分区常分为四个部分（efi-boot{1Gib}，swap{8Gib}，home，root）剩余两部分自己分配

```
# fdisk -‘目标磁盘分区’
```

按m可获取帮助，其中按d删除原本磁盘分区，输入数字为磁盘序号，之后按n建立新的分区，

根据所分成的四个扇区多次创建，序号自行拟定，分配空间即输入想要分配的大小

```
+1G
```

###### **格式化分区**

对于efi分区

```
# mkfs.fat -F 32 /dev/efi_system_partition（EFI 系统分区）
```

对于swap分区

```
# mkswap /dev/swap_partition（交换空间分区）
```

对于root和home分区

```
# mkfs.ext4 /dev/root_partition（根分区）
```

###### **挂载分区**

将根磁盘卷[挂载](https://wiki.archlinuxcn.org/wiki/文件系统#挂载文件系统)到 `/mnt`

```
# mount /dev/root_partition（根分区） /mnt
```

然后使用 [mkdir(1)](https://man.archlinux.org/man/mkdir.1) 在 `/mnt` 下创建任何剩余的挂载点（例如，为`/boot` 而创建`/mnt/boot`），并按相应的层级顺序挂载相应的磁盘卷。

对于 UEFI 系统，挂载 EFI 系统分区：

```
# mount --mkdir /dev/efi_system_partition /mnt/boot
```

如果创建了[交换空间](https://wiki.archlinuxcn.org/wiki/Swap)卷，请使用 [swapon(8)](https://man.archlinux.org/man/swapon.8) 启用它：

```
# swapon /dev/swap_partition（交换空间分区）
```

稍后 [genfstab](https://wiki.archlinuxcn.org/wiki/Genfstab) 将自动检测挂载的文件系统和交换空间。

---

#### 2.开始安装系统

**选择镜像站**

`/etc/pacman.d/mirrorlist` 文件中没有合适的镜像站,我们将其删除输入以下内容

```
rm /etc/pacman.d/mirrorlist
```

```
cp /etc/pacman.d/mirrorlist.pacnew /etc/pacman.d/mirrorlist
```

```
vim /etc/pacman.d/mirrorlist
```

跳转到文件夹中后按‘ / ‘进行搜索输入tsinghua，将前面的注释取消，选择清华镜像源（vim中按i为插入模式，esc可退出，按：，输入wq为保存退出，q为不保存退出，前面加！为强制进行）

###### 下载arch

```
pacstrap -K /mnt base linux linux-firmware vim
```

---

#### 3.配置系统

###### **生成 fstab 文件**

生成 [fstab](https://wiki.archlinuxcn.org/wiki/Fstab) 文件以使需要的文件系统（如启动目录 `/boot`）在启动时被自动挂载，用 `-U` 或 `-L` 选项分别设置 UUID 或卷标：

```
# genfstab -U /mnt > /mnt/etc/fstab
```

**强烈建议**在执行完以上命令后，检查一下生成的 `/mnt/etc/fstab` 文件是否正确。如果有问题，最好在现在手动修改。对于熟练者，可以自行编辑 `/mnt/etc/fstab` 文件。

可以手动修改 `/mnt/etc/fstab` 添加挂载选项（参见 [mount(8) § FILESYSTEM-INDEPENDENT_MOUNT_OPTIONS](https://man.archlinux.org/man/mount.8#FILESYSTEM-INDEPENDENT_MOUNT_OPTIONS) 和 [ext4(5) § MOUNT_OPTIONS](https://man.archlinux.org/man/ext4.5#MOUNT_OPTIONS)）。例如，给[固态硬盘](https://wiki.archlinuxcn.org/wiki/固态硬盘)的 [ext4](https://wiki.archlinuxcn.org/wiki/Ext4) 文件系统添加 `discard` 选项以启用 [TRIM](https://wiki.archlinuxcn.org/wiki/TRIM)。

###### **chroot 到新安装的系统**

接下来的步骤需要像启动到新安装的系统一样直接与其环境、工具和配置进行交互，请 [chroot](https://wiki.archlinuxcn.org/wiki/Change_root) 到新安装的系统：

```
# arch-chroot /mnt
```

###### **设置时间和时区**

通过以下命令设置[时区](https://wiki.archlinuxcn.org/wiki/系统时间#时区)：

```
# ln -sf /usr/share/zoneinfo/地区名/城市名 /etc/localtime
```

然后运行 [hwclock(8)](https://man.archlinux.org/man/hwclock.8) 以生成 `/etc/adjtime`：

```
# hwclock --systohc
```

通过vim进行文件夹的更改

```
vim /etc/locale.gen
```

[编辑](https://wiki.archlinuxcn.org/wiki/编辑) `/etc/locale.gen`，然后取消掉 `en_US.UTF-8 UTF-8` 和其他需要的 UTF-8 [区域设置](https://wiki.archlinuxcn.org/wiki/Locale)前的注释（**#**）。

接着执行 `locale-gen` 以生成 locale 信息：

```
# locale-gen
```

然后创建 [locale.conf(5)](https://man.archlinux.org/man/locale.conf.5) 文件，并[编辑设定 LANG 变量](https://wiki.archlinuxcn.org/wiki/Locale#系统区域设置)，比如：

```
/etc/locale.conf
LANG=en_US.UTF-8
```

[创建](https://wiki.archlinuxcn.org/wiki/创建) [hostname](https://wiki.archlinuxcn.org/wiki/网络配置#设置计算机名) 文件：

```
vim /etc/hostname
```

###### 配置网络

输入

```
pacman -S networkmanager
```

如遇到错误输入

```
pacman -Sy archlinux-keyring
```

```
pacman -Syu
```

```
pacman-key --init
```

```
pacman-key --populate archlinux
```

```
pacman-key --refresh-keys
```

```
pacman -Scc
```

```
pacman -Syu
```

```
pacman -Sy archlinux-keyring
```

完成后再次输入

```
pacman -S networkmanager
```

###### **设置 root 密码**

使用以下命令设置 root [密码](https://wiki.archlinuxcn.org/wiki/用户和用户组#用户信息存储)：

```
# passwd
```

###### **安装引导程序**

需要安装 Linux 引导加载程序，才能在安装后启动系统，可以使用的的引导程序已在[引导加载程序](https://wiki.archlinuxcn.org/wiki/引导加载程序)中列出，请选择一个安装并配置它，[GRUB](https://wiki.archlinuxcn.org/wiki/GRUB) 是一个比较常见且通用的。

###### 查看版本

```
efibootmgr -v
```

```
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB --removable
```

```
grub-mkconfig -o /boot/grub/grub.cfg
```

###### 解挂载

```
umount -R /mnt
```

---

#### 4.重新启动系统

输入

```
reboot
```

重启系统

---

#### 5.安装后的工作

###### 创建用户

```
useradd -m -G wheel -s  "用户"
```

```
pacman -S sudo
```

###### 设置网络

运行查看wifi列表进行连接

```# arch-chroot /mnt
systemctl enable --now NetworkManager
```

```
nmcli device wifi list
```

```
nmcli device wifi connect SSID_或_BSSID password 密码
```

###### 为用户设置密码

```
passwd pxfish
```

```
vim /etc/sudoers
```

进入sudo后加下列注释取消

![image-20251107020915285](C:\Users\86183\AppData\Roaming\Typora\typora-user-images\image-20251107020915285.png)

###### 为linux安装fdisk

```
pacman -S fdisk
```

###### 实现双系统

将windows系统所在的磁盘挂载到/mnt

想要让 arub-mkcontig 探测其他已经安装的系统并目动把他们添加到启动菜单中，安装os-prober
将windows系统所在的磁盘挂载到/mnt。然后重新运行 grub-mkconfig。如果你得到以下输出:
Warning:os prober will not be executed to detect other bootable partitions，则编辑 /etc/default/grub 并取消下面这一行的注释![image-20251107021352471](C:\Users\86183\AppData\Roaming\Typora\typora-user-images\image-20251107021352471.png)

![image-20251107021421815](C:\Users\86183\AppData\Roaming\Typora\typora-user-images\image-20251107021421815.png)

```
grub-mkconfig -o /boot/grub/grub.cfg
```

如还没有windows选项

```
ls /sys/firmware/efi
```

```
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

###### 美化grub

https://www.bilibili.com/video/BV1qzbzzcEXa/?spm_id_from=333.337.search-card.all.click

或者自行寻找皮肤

#### 最后为对arch的自行配置可以安装 plasma-x11（kde）上手简易，或者niri，其中可自行配置
